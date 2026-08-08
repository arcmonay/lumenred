export const metadata = {
  title: "Science",
  description: "How red and near-infrared light therapy systems are used.",
};

export default function SciencePage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <p className="eyebrow">Science</p>
      <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
        Wavelengths with a job
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
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          ["630–660nm", "Surface-focused red for facial and skin routines."],
          ["850nm", "Near-infrared for deeper recovery-oriented sessions."],
          ["Irradiance", "Power density at a stated distance (mW/cm²)."],
          ["Session design", "Timed protocols beat endless “more is better.”"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5"
          >
            <dt className="font-display text-xl text-[var(--ink)]">{k}</dt>
            <dd className="mt-2 text-sm text-[var(--ink-muted)]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
