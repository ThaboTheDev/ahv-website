/**
 * A one-line event bus for the fundraising panel.
 *
 * The panel intercepts [data-ahv-open] clicks at the document level, which
 * stops those events reaching component handlers. Anything that must also
 * react to the panel opening (the header closing its mobile menu, say)
 * subscribes here instead.
 */
export const fundraiseBus = new EventTarget();

export const FUNDRAISE_OPEN_EVENT = "ahv-fundraising:open";
