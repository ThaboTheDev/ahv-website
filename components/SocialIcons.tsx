/**
 * Small monochrome marks for the social channels in the footer.
 *
 * Hand-drawn on a 12x12 grid so they inherit the footer's colour and sit
 * beside text at the same optical weight. No icon font, no third-party
 * assets, no brand-coloured fills: the site's ground and ink govern.
 */

const PATHS: Record<string, { d: string; fill: boolean }[]> = {
  X: [{ d: "M2.2 2.2 9.8 9.8 M9.8 2.2 2.2 9.8", fill: false }],
  Instagram: [
    { d: "M3.4 1.8h5.2a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H3.4a1.6 1.6 0 0 1-1.6-1.6V3.4a1.6 1.6 0 0 1 1.6-1.6Z", fill: false },
    { d: "M6 4.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Z", fill: false },
    { d: "M8.75 3.3a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1Z", fill: true },
  ],
  TikTok: [
    {
      d: "M7.5 1.5h-1.3v6.9a1.45 1.45 0 1 1-1.2-1.43V5.5a2.9 2.9 0 1 0 2.5 2.87V4a4.1 4.1 0 0 0 2.6 1.1V3.6a2.6 2.6 0 0 1-2.6-2.1Z",
      fill: true,
    },
  ],
  Facebook: [
    {
      d: "M8 1.8H6.6A2 2 0 0 0 4.5 3.9v1.3H3.2v1.9h1.3v3.8h1.9V7.1h1.3l.3-1.9H6.4V4.1c0-.5.3-.7.7-.7h.9Z",
      fill: true,
    },
  ],
};

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const paths = PATHS[name] ?? PATHS.X;
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={className} fill="none">
      {paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          fill={path.fill ? "currentColor" : "none"}
          stroke={path.fill ? "none" : "currentColor"}
          strokeWidth={path.fill ? 0 : 1.3}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
