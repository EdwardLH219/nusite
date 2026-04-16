import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({ children, url, className }: BrowserFrameProps) {
  return (
    <div className={cn("browser-frame", className)}>
      <div className="browser-frame-toolbar">
        <div className="browser-frame-dot" />
        <div className="browser-frame-dot" />
        <div className="browser-frame-dot" />
        {url && (
          <div className="ml-3 flex-1">
            <div className="mx-auto max-w-xs rounded-md bg-background px-3 py-1 text-center text-xs text-caption">
              {url}
            </div>
          </div>
        )}
      </div>
      <div className="browser-frame-content">{children}</div>
    </div>
  );
}
