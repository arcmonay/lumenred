export const metadata = {
  title: "Science",
  description: "How red and near-infrared light therapy devices are specified.",
};

export default function SciencePage() {
  return (
    <div className="page page--soft">
      <article className="container">
        <p className="section__eyebrow">Science</p>
        <h1 className="page-title">What is red light therapy?</h1>
        <p className="page-lede">
          Red light therapy uses specific wavelengths of red and near-infrared light
          as part of wellness and recovery routines. Product pages are educational
          and commercial — not medical advice.
        </p>
        <div className="dial-grid">
          {[
            ["630–660nm", "Commonly used in skin-facing red light routines."],
            ["850nm", "Near-infrared wavelength often chosen for deeper-tissue sessions."],
            ["Irradiance", "Power density at a stated distance (mW/cm²) for comparing devices."],
            ["Session design", "Timed, consistent protocols beat endless “more is better.”"],
          ].map(([k, v]) => (
            <div key={k} className="dial">
              <strong>{k}</strong>
              <p>{v}</p>
            </div>
          ))}
        </div>
        <p className="page-lede" style={{ marginTop: "2rem" }}>
          Always follow professional guidance for therapeutic use. Lumenred equipment
          is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </article>
    </div>
  );
}
