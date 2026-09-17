/**
 * packages/content holds the site's source of truth.
 *
 * Every page renders from this package, and the copy document
 * (AHV-Final-Page-Copy.md) is generated from it by `npm run export:copy`,
 * so the document cannot fall out of step with the site.
 */

export * from "./global";
export * from "./home";
export * from "./institution";
export * from "./departments";
export * from "./positions";
export * from "./lexicon";
export * from "./research";
export * from "./publications";
export * from "./database";
export * from "./foundations";
export * from "./engage";
export * from "./newsroom";
export * from "./media";
export * from "./support";
