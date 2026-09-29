import { ImageResponse } from "next/og";
import { INSTITUTION } from "@content/global";
import { AFRICA_PATH, AFRICA_VIEWBOX } from "@/lib/africa-path";

/**
 * The default share image for every page: the Africa mark on the brand field,
 * with the institution's name. Generated at build time.
 */
export const alt = `${INSTITUTION.name}. ${INSTITUTION.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 84px",
          background:
            "linear-gradient(135deg, #3a0510 0%, #6E0B1A 55%, #14090b 100%)",
          color: "#f6efe4",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d9a441",
            }}
          >
            Research Institution
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            African Hidden Voices
          </div>
          <div
            style={{
              marginTop: 28,
              width: 96,
              height: 4,
              background: "#D13A48",
            }}
          />
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(246,239,228,0.85)",
            }}
          >
            Advancing African Indigenous Spirituality as a global academic
            discipline.
          </div>
        </div>
        <svg
          width="380"
          height="400"
          viewBox={AFRICA_VIEWBOX}
          style={{ opacity: 0.9 }}
        >
          <path d={AFRICA_PATH} fill="#D13A48" />
        </svg>
      </div>
    ),
    size,
  );
}
