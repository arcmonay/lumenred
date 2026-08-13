import Image from "next/image";

type BrandLogoProps = {
  size?: number;
  priority?: boolean;
  className?: string;
};

export function BrandLogo({
  size = 44,
  priority = false,
  className = "",
}: BrandLogoProps) {
  return (
    <span
      className={`mark-frame ${className}`.trim()}
      style={{ ["--mark-size" as string]: `${size}px` }}
    >
      <Image
        src="/logo.png"
        alt="Lumenred cardinal mark"
        width={size}
        height={size}
        priority={priority}
      />
    </span>
  );
}
