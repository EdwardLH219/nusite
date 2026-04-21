import { reassurances } from "@/lib/content";

export function Reassure() {
  return (
    <>
      <h2 className="h1" style={{ maxWidth: "18ch" }}>
        Designed around your confidence.
      </h2>
      <p
        className="body-copy"
        style={{ marginTop: 18, maxWidth: "56ch" }}
      >
        Four things we won’t move on. Hold us to them.
      </p>

      <div className="grid" style={{ marginTop: 40 }}>
        {reassurances.map((r) => (
          <div key={r.heading} className="item">
            <div className="k">{r.k}</div>
            <h4>{r.heading}</h4>
            <p>{r.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
