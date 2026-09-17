import { AFRICA_PATH, AFRICA_VIEWBOX } from "@/lib/africa-path";
import { BIRD_PATH, FLOCK, BRAND_GRADIENT } from "@/lib/brand";

/**
 * The AHV brand mark: the African continent with a flock of birds rising
 * out of it. Rendered as inline SVG so it inherits sizing from its container
 * and needs no network request.
 */
export function BrandMark({
  className,
  title = "African Hidden Voices",
  /** Unique id suffix, to prevent gradient collisions when rendered twice. */
  idSuffix = "default",
}: {
  className?: string;
  title?: string;
  idSuffix?: string;
}) {
  const gradientId = `ahv-gradient-${idSuffix}`;
  // An empty title marks the mark as decorative, so it is hidden from
  // assistive technology rather than announced as an unlabelled image.
  const decorative = title.length === 0;

  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img" as const, "aria-label": title })}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0.85"
          y2="1"
        >
          <stop offset="0%" stopColor={BRAND_GRADIENT.from} />
          <stop offset="55%" stopColor={BRAND_GRADIENT.via} />
          <stop offset="100%" stopColor={BRAND_GRADIENT.to} />
        </linearGradient>
      </defs>

      {/* Continent */}
      <path
        d={AFRICA_PATH}
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
      />

      {/* Birds knocked out of the landmass */}
      {FLOCK.filter((bird) => bird.tone === "light").map((bird, i) => (
        <g
          key={`light-${i}`}
          transform={`translate(${bird.x} ${bird.y}) rotate(${bird.rotate}) scale(${bird.scale})`}
        >
          <path d={BIRD_PATH} fill="var(--color-cream)" />
        </g>
      ))}

      {/* Birds that have lifted clear of the continent */}
      {FLOCK.filter((bird) => bird.tone === "dark").map((bird, i) => (
        <g
          key={`dark-${i}`}
          transform={`translate(${bird.x} ${bird.y}) rotate(${bird.rotate}) scale(${bird.scale})`}
        >
          <path d={BIRD_PATH} fill={BRAND_GRADIENT.via} />
        </g>
      ))}
    </svg>
  );
}

/**
 * The stacked "AFRICAN / HIDDEN / VOICES" wordmark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-wordmark uppercase leading-[1.08] tracking-[0.02em] ${className ?? ""}`}
    >
      <span className="block">African</span>
      <span className="block">Hidden</span>
      <span className="block">Voices</span>
    </span>
  );
}

/**
 * Mark + wordmark lockup, used in the site header and footer.
 */
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <BrandMark
        idSuffix="lockup"
        className={markClassName ?? "h-11 w-auto"}
        title=""
      />
      <Wordmark
        className={
          wordmarkClassName ??
          "text-[0.9375rem] font-semibold text-brand-800"
        }
      />
    </span>
  );
}
