import Image from "next/image";

/**
 * Portrait medallion for a prophet.
 *
 * When no photograph is available, falls back to an elegant monogram set
 * against the brand gradient. Drop an image into /public/images/voices/ and
 * reference it via the `image` field on the voice record to use a photo.
 */
export function Portrait({
  name,
  image,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  name: string;
  image?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter((part) => part.length > 2 || part === part.toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className={`relative isolate overflow-hidden ${className ?? ""}`}
    >
      {image ? (
        <Image
          src={image}
          alt={`Portrait of ${name}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600"
        >
          {/* Faint concentric rings, echoing the imprint of oral tradition. */}
          <span className="absolute inset-0 opacity-[0.14]">
            <span className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/60" />
            <span className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/60" />
            <span className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/60" />
          </span>
          <span className="relative font-wordmark text-4xl font-semibold tracking-[0.06em] text-cream/95 sm:text-5xl">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
