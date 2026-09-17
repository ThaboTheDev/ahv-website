/**
 * House-style helpers.
 *
 * Binding rules are documented in packages/content/HOUSE-STYLE.md. These
 * functions exist so that the rules are applied in code rather than
 * remembered by whoever is writing.
 */

/**
 * Format a count of items for prose: words for one to nine, figures for
 * ten and above.
 */
export function countWord(n: number): string {
  const words = [
    "no",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return n < words.length ? words[n] : String(n);
}

/** Format a South African rand amount with a space as the thousands separator. */
export function rand(amount: number): string {
  return `R${amount.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

/**
 * Keep a string free of em dashes. House style forbids them; this is used by
 * the copy export and by the house-style check to catch accidental use.
 */
export function hasEmDash(text: string): boolean {
  return /[\u2014\u2013]/.test(text);
}
