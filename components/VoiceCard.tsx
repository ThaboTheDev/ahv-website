import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import type { Voice } from "@/lib/voices";

export function VoiceCard({
  voice,
  priority = false,
}: {
  voice: Voice;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-sand/70 bg-cream transition-shadow duration-300 hover:shadow-[0_10px_40px_-16px_rgba(110,11,26,0.35)]">
      <Link
        href={`/voices/${voice.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        <Portrait
          name={voice.name}
          image={voice.image}
          priority={priority}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow">{voice.honorific}</p>
          <h3 className="mt-2 text-2xl leading-snug text-ink transition-colors group-hover:text-brand-700">
            {voice.name}
          </h3>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-ash">
            {voice.lifespan}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">
            {voice.summary}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
            Read the profile
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M1 8h13M9 3l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
