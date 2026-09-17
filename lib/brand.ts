/**
 * Brand mark geometry for African Hidden Voices.
 *
 * The logo depicts the African continent with a flock of birds rising out of
 * it — a metaphor for suppressed voices no longer hidden. This module holds
 * the bird silhouette plus the flock layout, so both the React component and
 * the build/preview scripts share one source of truth.
 */

/**
 * A swallow silhouette in flight — long swept wings raised in a shallow "V"
 * with a forked tail. Normalised to roughly 100 units wide, centred on the
 * origin, with the body at the bottom centre.
 */
export const BIRD_PATH =
  "M-50-22C-34-10-16 0 0 4C16 0 34-10 50-22C32-2 14 8 3 16L0 10L-3 16C-14 8-32-2-50-22Z";

export type BirdTone = "light" | "dark";

export interface Bird {
  /** Centre position in the 400x420 mark viewBox. */
  x: number;
  y: number;
  /** Scale factor applied to the normalised silhouette. */
  scale: number;
  /** Rotation in degrees. Negative tilts the bird upward. */
  rotate: number;
  /** "light" = cream (knocked out of the continent), "dark" = crimson. */
  tone: BirdTone;
}

/**
 * Flock layout: birds lift off the northern half of the continent and fan
 * outward to the north-west, echoing the logo artwork — smaller and higher
 * toward the top-left, larger and closer to the landmass at bottom-right.
 */
export const FLOCK: Bird[] = [
  // Highest birds, rising away to the north-west.
  { x: 26, y: 74, scale: 0.46, rotate: -16, tone: "dark" },
  { x: 78, y: 46, scale: 0.4, rotate: -8, tone: "dark" },
  { x: 46, y: 122, scale: 0.52, rotate: -22, tone: "dark" },
  { x: 104, y: 96, scale: 0.44, rotate: -12, tone: "dark" },
  { x: 16, y: 158, scale: 0.4, rotate: -26, tone: "dark" },

  // Crossing the continent's shoulder — knocked out in cream.
  { x: 152, y: 122, scale: 0.5, rotate: -10, tone: "light" },
  { x: 196, y: 92, scale: 0.44, rotate: -18, tone: "light" },
  { x: 168, y: 168, scale: 0.42, rotate: -6, tone: "light" },
  { x: 118, y: 178, scale: 0.38, rotate: -14, tone: "light" },

  // Fanning east above the Horn.
  { x: 262, y: 74, scale: 0.46, rotate: -20, tone: "dark" },
  { x: 312, y: 118, scale: 0.4, rotate: -10, tone: "dark" },
  { x: 240, y: 132, scale: 0.36, rotate: -16, tone: "dark" },
];

/** Brand gradient used for the mark and accent rules. */
export const BRAND_GRADIENT = {
  from: "#6E0B1A",
  via: "#A6192E",
  to: "#D13A48",
} as const;
