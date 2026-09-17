import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VoiceCard } from "@/components/VoiceCard";
import { voicesByEra } from "@/lib/voices";

export const metadata: Metadata = {
  title: "The Voices",
  description:
    "Profiles of the African prophets, prophetesses and spiritual leaders documented by the African Hidden Voices research team.",
};

export default function VoicesPage() {
  const voices = voicesByEra();

  return (
    <>
      <PageHero
        eyebrow="The archive"
        title="Voices no longer suppressed"
        intro="Each profile below is the work of the AHV research team — drawing on oral testimony, colonial-era records, court commissions and the writings of the prophets themselves."
      />

      <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl text-sm leading-relaxed text-ash">
            Ordered by year of birth. Profiles marked for continuation are the
            subject of ongoing research; further material is published as it is
            verified.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voices.map((voice, i) => (
              <VoiceCard
                key={voice.slug}
                voice={voice}
                priority={i < 2}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
