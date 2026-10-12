import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { getCmsStore } from "@/lib/cms";
import { getAdminSession } from "@/lib/admin-auth";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { AdminDashboard } from "@/components/AdminDashboard";
import { DEPARTMENTS } from "@content/departments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Editorial & Research Administration",
  description:
    "Sign in to publish and manage AHV blog essays, working papers, conference records, Iimboni Database entries, publications, announcements, lexicon terms and standing positions.",
  path: "/admin",
  noindex: true,
});

export default async function AdminPage() {
  const [store, session] = await Promise.all([
    Promise.resolve(getCmsStore()),
    getAdminSession(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Editorial & Research Administration"
        title="AHV Content & Research Desk"
        lede="Publish and manage blog essays, working papers, conference papers, Iimboni Database records, books, newsroom releases, restored lexicon entries and standing positions, with full image and plate support."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admin" }]}
        meta={[
          {
            label: "Access control",
            value: session.authenticated
              ? `Signed in as ${session.email}`
              : "Administrator sign-in required",
          },
          {
            label: "Media & visual plates",
            value: "Upload images or attach archival plates to every record",
          },
          {
            label: "Governing rule",
            value: (
              <>
                <em className="italic">izwi lilandela umoya</em>, the word
                follows the spirit
              </>
            ),
          },
        ]}
      />

      <Section tone="paper">
        <AdminDashboard
          initialStore={store}
          departments={DEPARTMENTS}
          initialAuthenticated={session.authenticated}
          initialEmail={session.email}
        />
      </Section>
    </>
  );
}
