import Link from "next/link";
import { BrandMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden bg-ink px-5 py-20 sm:px-8">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-ink"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <BrandMark
          idSuffix="notfound"
          title=""
          className="mx-auto h-24 w-auto opacity-90"
        />
        <p className="eyebrow mt-8 text-ochre-soft">Error 404</p>
        <h1 className="mt-3 text-3xl leading-tight text-cream sm:text-4xl">
          This voice could not be found
        </h1>
        <p className="mt-5 text-base leading-relaxed text-sand/80">
          The page you were looking for has either moved or was never recorded.
          Let us guide you back to the archive.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-white"
          >
            Back to home
          </Link>
          <Link
            href="/voices"
            className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/10"
          >
            Browse the voices
          </Link>
        </div>
      </div>
    </section>
  );
}
