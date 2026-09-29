import OpengraphImage from "./opengraph-image";
import { INSTITUTION } from "@content/global";

// Route segment config must be declared literally in this file.
export const alt = `${INSTITUTION.name}. ${INSTITUTION.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
