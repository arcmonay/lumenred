export const metadata = {
  title: "Wavelengths",
  description: "How red and near-infrared light therapy systems are specified.",
};

export default function SciencePage() {
  return (
    <article className="frame">
      <p className="page-kicker">Lab notes</p>
      <h1 className="page-title">Wavelengths with a job</h1>
      <div className="page-lede space-y-5" style={{ display: "grid" }}>
        <p>
          Red light (around 630–660nm) is commonly used in skin-facing routines.
          Near-infrared (around 850nm) reaches deeper tissue and is often chosen
          for muscle and joint protocols.
        </p>
        <p>
          Lumenred systems list wavelength mix, LED count, and power class so you
          can compare equipment the way a studio would—not by marketing adjectives.
        </p>
        <p>
          Follow professional guidance for therapeutic use. Product pages are
          educational and commercial, not medical advice. No cure claims.
        </p>
      </div>
      <ul className="dial-list">
        {[
          ["630–660nm", "Surface-focused red for facial and skin routines."],
          ["850nm", "Near-infrared for deeper recovery-oriented sessions."],
          ["Irradiance", "Power density at a stated distance (mW/cm²)."],
          ["Session design", "Timed protocols beat endless “more is better.”"],
        ].map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong>
            <p>{v}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
