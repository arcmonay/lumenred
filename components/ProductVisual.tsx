type Props = {
  tone: number;
  title: string;
  collection: string;
  className?: string;
};

export function ProductVisual({ tone, title, collection, className = "" }: Props) {
  const toneClass = `tone-${(Math.abs(tone) % 6) + 1}`;
  const isPanel =
    collection === "full-body-panels" ||
    collection === "desktop-panels" ||
    collection === "bundles" ||
    collection === "beds-systems";
  const isMask = collection === "face-masks";
  const isPad =
    collection === "targeted-wraps" || collection === "wraps-belts";
  const isHand = collection === "handheld";

  return (
    <div
      className={`product-glow ${toneClass} relative aspect-[4/5] overflow-hidden border border-[var(--line)] ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.05),transparent_55%)]" />
      <div className="relative z-10 flex h-full items-center justify-center p-6">
        {isPanel && (
          <div className="relative h-[78%] w-[42%] border border-white/10 bg-[linear-gradient(180deg,#2a2f3b,#171b24)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-[8%] grid grid-cols-6 gap-[3px] opacity-90">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-[1px]"
                  style={{
                    background:
                      "radial-gradient(circle, var(--panel-led), color-mix(in srgb, var(--panel-led) 20%, black))",
                    boxShadow:
                      "0 0 6px color-mix(in srgb, var(--panel-led) 55%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {isMask && (
          <div
            className="relative h-[58%] w-[58%] rounded-[45%] border border-white/15"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--panel-led) 55%, #222), #14171f)",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.35), 0 0 40px var(--glow)",
            }}
          >
            <div className="absolute left-[22%] top-[38%] h-3 w-3 rounded-full bg-black/50" />
            <div className="absolute right-[22%] top-[38%] h-3 w-3 rounded-full bg-black/50" />
            <div className="absolute bottom-[28%] left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-black/30" />
          </div>
        )}

        {isPad && (
          <div
            className="h-[34%] w-[78%] rounded-full border border-white/10"
            style={{
              background:
                "linear-gradient(90deg, #222733, color-mix(in srgb, var(--panel-led) 40%, #1a1d26), #222733)",
              boxShadow: "0 0 36px var(--glow)",
            }}
          />
        )}

        {isHand && (
          <div
            className="h-[55%] w-[22%] rounded-2xl border border-white/10"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--panel-led) 60%, #333), #1a1d26)",
              boxShadow: "0 0 30px var(--glow)",
            }}
          >
            <div
              className="mx-auto mt-3 h-10 w-[70%] rounded-md"
              style={{
                background: "var(--panel-led)",
                boxShadow: "0 0 16px var(--glow)",
              }}
            />
          </div>
        )}

        {!isPanel && !isMask && !isPad && !isHand && (
          <div
            className="h-24 w-24 border border-white/10"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--panel-led) 50%, #222), #151820)",
              boxShadow: "0 0 36px var(--glow)",
            }}
          />
        )}
      </div>
      <p className="absolute bottom-3 left-3 right-3 z-10 truncate text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
        {title}
      </p>
    </div>
  );
}
