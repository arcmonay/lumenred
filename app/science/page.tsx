export const metadata = {
  title: "Science",
  description: "How red and near-infrared light therapy systems are used.",
};

export default function SciencePage() {
  return (
    <article className="chamber-page">
      <p className="eyebrow">Science</p>
      <h1 className="font-display ritual__title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", textAlign: "left" }}>
        Wavelengths with a job.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--ink-muted)]">
        <p>
          Red light (around 630–660nm) is commonly used in skin-facing routines.
          Near-infrared (around 850nm) penetrates deeper and is often chosen for
          muscle and joint protocols.
        </p>
        <p>
          Lumenred systems are specified with wavelength mix, LED count, and
          irradiance targets so buyers can compare equipment the way a clinic
          would—not just by marketing adjectives.
        </p>
        <p>
          Always follow professional guidance for therapeutic use. Product pages
          are educational and commercial, not medical advice.
        </p>
      </div>
      <ol className="mt-10" style={{ listStyle: "none", margin: 0, padding: 0, borderLeft: "1px solid rgba(209,69,47,0.45)" }}>
        {[
          ["630–660nm", "Surface-focused red for facial and skin routines."],
          ["850nm", "Near-infrared for deeper recovery-oriented sessions."],
          ["Irradiance", "Power density at a stated distance (mW/cm²)."],
          ["Session design", "Timed protocols beat endless “more is better.”"],
        ].map(([k, v], i) => (
          <li key={k} className="grid grid-cols-[2.6rem_1fr] gap-x-4 py-4 pl-5">
            <span className="text-[0.78rem] tracking-[0.12em] text-[var(--ember)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-display text-2xl">{k}</p>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">{v}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
