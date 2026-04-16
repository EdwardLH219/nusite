"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ─── Context ─── */

interface PreviewModalContextValue {
  open: () => void;
}

const PreviewModalContext = createContext<PreviewModalContextValue>({
  open: () => {},
});

export function usePreviewModal() {
  return useContext(PreviewModalContext);
}

/* ─── Provider ─── */

export function PreviewModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <PreviewModalContext.Provider value={{ open }}>
      {children}
      <PreviewModal isOpen={isOpen} onClose={close} />
    </PreviewModalContext.Provider>
  );
}

/* ─── Form types ─── */

interface PreviewFormData {
  name: string;
  businessName: string;
  email: string;
  websiteUrl: string;
  note: string;
}

type FormErrors = Partial<Record<keyof PreviewFormData, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyForm: PreviewFormData = {
  name: "",
  businessName: "",
  email: "",
  websiteUrl: "",
  note: "",
};

/* ─── Submission stub ─── */

export async function submitPreviewRequest(
  data: PreviewFormData
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // eslint-disable-next-line no-console
  console.log("[NuSite] Preview request submitted:", data);

  return { success: true };
}

/* ─── Validation ─── */

function validate(data: PreviewFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.businessName.trim()) {
    errors.businessName = "Please enter your business name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.websiteUrl.trim()) {
    errors.websiteUrl = "Please enter your website URL.";
  } else {
    const url = data.websiteUrl.trim();
    const domain = url.replace(/^https?:\/\//, "");
    if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}/.test(domain)) {
      errors.websiteUrl = "Please enter a valid website URL.";
    }
  }

  return errors;
}

/* ─── Form field ─── */

function FormField({
  label,
  id,
  type = "text",
  inputMode,
  value,
  onChange,
  error,
  placeholder,
  required = true,
  inputRef,
}: {
  label: string;
  id: string;
  type?: string;
  inputMode?: "text" | "email" | "url";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-medium text-foreground"
      >
        {label}
        {!required && (
          <span className="text-caption ml-1 font-normal">Optional</span>
        )}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={
          id === "email"
            ? "email"
            : id === "name"
              ? "name"
              : id === "websiteUrl"
                ? "url"
                : id === "businessName"
                  ? "organization"
                  : undefined
        }
        className={cn(
          "h-11 rounded-lg border bg-background px-4 text-[0.9375rem] text-foreground placeholder:text-caption/60 outline-none transition-all duration-200",
          error
            ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/10"
            : "border-border focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5"
        )}
      />
      {error && (
        <p className="text-[0.8125rem] text-destructive">{error}</p>
      )}
    </div>
  );
}

/* ─── Modal ─── */

function PreviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PreviewFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && status !== "success") {
      const t = setTimeout(() => firstInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen, status]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm(emptyForm);
        setErrors({});
        setStatus("idle");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const updateField = useCallback(
    (field: keyof PreviewFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitPreviewRequest(form);
      if (result.success) {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: ease.out }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-background rounded-2xl shadow-xl border border-border/50"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: ease.out }}
                    className="flex flex-col items-center text-center gap-5 py-6 sm:py-8"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent"
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h2 className="text-h3 font-heading text-foreground">
                        We&rsquo;ve received your details
                      </h2>
                      <p className="text-body-sm text-muted-foreground max-w-sm">
                        We&rsquo;ll review{" "}
                        {form.businessName
                          ? `${form.businessName}\u2019s website`
                          : "your website"}{" "}
                        and build a free preview of your new one. You&rsquo;ll
                        hear from us at{" "}
                        <span className="text-foreground font-medium">
                          {form.email}
                        </span>{" "}
                        within two business days.
                      </p>
                    </div>

                    <p className="text-caption text-[0.8125rem]">
                      No follow-up needed from your side. We handle everything
                      from here.
                    </p>

                    <Button
                      variant="secondary"
                      size="default"
                      onClick={onClose}
                      className="mt-2"
                    >
                      Done
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={false}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col gap-2 mb-7 pr-8">
                      <h2
                        id="preview-modal-title"
                        className="text-h3 font-heading text-foreground"
                      >
                        Get your free preview
                      </h2>
                      <p className="text-body-sm text-muted-foreground">
                        Share a few details and we&rsquo;ll build a preview of
                        your new website. No commitment, no cost.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          label="Your name"
                          id="name"
                          value={form.name}
                          onChange={(v) => updateField("name", v)}
                          error={errors.name}
                          placeholder="Jane Smith"
                          inputRef={firstInputRef}
                        />
                        <FormField
                          label="Email address"
                          id="email"
                          type="email"
                          inputMode="email"
                          value={form.email}
                          onChange={(v) => updateField("email", v)}
                          error={errors.email}
                          placeholder="jane@example.com"
                        />
                      </div>

                      <FormField
                        label="Business name"
                        id="businessName"
                        value={form.businessName}
                        onChange={(v) => updateField("businessName", v)}
                        error={errors.businessName}
                        placeholder="Smith Physiotherapy"
                      />

                      <FormField
                        label="Current website URL"
                        id="websiteUrl"
                        inputMode="url"
                        value={form.websiteUrl}
                        onChange={(v) => updateField("websiteUrl", v)}
                        error={errors.websiteUrl}
                        placeholder="smithphysio.com"
                      />

                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="note"
                          className="text-[0.8125rem] font-medium text-foreground"
                        >
                          Anything we should know?{" "}
                          <span className="text-caption font-normal">
                            Optional
                          </span>
                        </label>
                        <textarea
                          id="note"
                          value={form.note}
                          onChange={(e) => updateField("note", e.target.value)}
                          rows={3}
                          placeholder="Goals, timeline, anything about your business"
                          className="rounded-lg border border-border bg-background px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-caption/60 outline-none transition-all duration-200 focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5 resize-none"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-[0.8125rem] text-destructive">
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full mt-1"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting"
                          ? "Sending\u2026"
                          : "Request My Preview"}
                      </Button>

                      <p className="text-caption text-[0.8125rem] text-center">
                        We&rsquo;ll never share your information. No spam, ever.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
