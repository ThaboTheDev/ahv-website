import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { RecordCard } from "@/components/Cards";
import { DATABASE_RECORDS, databaseCountries } from "@content/database";

export const metadata: Metadata = {
  title: "The Iimboni Database",
  description:
    "A research record of Africa's spiritual authorities: Iimboni, spiritual kings, healers, guiders and founders of institutions.",
};

export default function DatabasePage() {
  const countries = databaseCountries();
  const underVerification = DATABASE_RECORDS.filter(
    (record) => record.status === "Under verification",
  ).length;

  return (
    <>
      <PageHero
        eyebrow="The Iimboni Database"
        title="They were not forgotten. They were removed."
        lede="A research record of Africa's spiritual authorities: Iimboni, spiritual kings, healers, guiders and founders of institutions, documented from oral testimony, archival evidence and field research."
        crumbs={[{ label: "Home", href: "/" }, { label: "Iimboni Database" }]}
        meta={[
          { label: "Records published", value: String(DATABASE_RECORDS.length) },
          { label: "Countries", value: String(countries.length) },
          {
            label: "Under verification",
            value: String(underVerification),
          },
        ]}
      />

      <Section tone="paper">
        <div className="max-w-2xl space-y-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
          <p>
            Deposed, imprisoned, tried under witchcraft statutes, renamed, and
            written out of the record by the administrations that wrote the
            record. This database returns them to it, one documented record at a
            time.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6">
          <Link href="/database/method" className="link-brand font-mono text-sm">
            The documentary method
          </Link>
          <Link href="/database/submit" className="link-brand font-mono text-sm">
            Submit a voice
          </Link>
        </div>
      </Section>

      {/* Records */}
      <Section tone="wash">
        <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
          The records currently held
        </h2>

        <div className="mt-10 space-y-12">
          {DATABASE_RECORDS.map((record) => (
            <RecordCard key={record.slug} record={record} />
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-t border-rule pt-6 font-mono text-xs leading-relaxed text-ash">
          Every record carries the same fields, and the fields are shown even
          when empty, because an empty field is itself information. The field
          stating what is not established is compulsory.
        </p>
      </Section>

      {/* Call */}
      <Section tone="ink" size="tight">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl leading-snug text-paper">
            Do you carry knowledge of an Imboni?
          </h2>
          <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-rule-soft/85">
            If your family or community holds the memory of an Imboni, a
            spiritual king, a healer or a spiritual leader whose work is not in
            the record, AHV would like to document it.
          </p>
          <Link
            href="/database/submit"
            className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-paper"
          >
            <span className="underline decoration-ochre decoration-1 underline-offset-4">
              Submit a voice
            </span>
            <span aria-hidden className="text-ochre">
              →
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
