"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CmsStore } from "@/lib/cms";
import {
  checkHouseStyleText,
  sanitiseDashes,
  slugify,
  type StyleIssue,
} from "@/lib/house-style";
import type { Department } from "@content/departments";
import type {
  BlogPost,
  BlogSection,
  BlogSource,
  ContentImage,
} from "@content/blog";
import type {
  Conference,
  ConferencePaper,
  WorkingPaper,
} from "@content/research";
import type { DatabaseRecord, RecordStatus } from "@content/database";
import type {
  ForthcomingPublication,
  Publication,
} from "@content/publications";
import type { Announcement } from "@content/newsroom";
import type { LexiconEntry } from "@content/lexicon";
import type { Position } from "@content/positions";

type AdminTab =
  | "blog"
  | "research"
  | "database"
  | "publications"
  | "newsroom"
  | "lexicon"
  | "positions";

const DEFAULT_LOGIN_EMAIL = "admin@africanhiddenvoices.co.za";

const TABS: {
  id: AdminTab;
  label: string;
  publicHref: string;
  publicLabel: string;
}[] = [
  {
    id: "blog",
    label: "Blog & Essays",
    publicHref: "/blog",
    publicLabel: "View /blog",
  },
  {
    id: "research",
    label: "Research & Papers",
    publicHref: "/research",
    publicLabel: "View /research",
  },
  {
    id: "database",
    label: "Iimboni Database",
    publicHref: "/database",
    publicLabel: "View /database",
  },
  {
    id: "publications",
    label: "Publications",
    publicHref: "/publications",
    publicLabel: "View /publications",
  },
  {
    id: "newsroom",
    label: "Newsroom",
    publicHref: "/newsroom",
    publicLabel: "View /newsroom",
  },
  {
    id: "lexicon",
    label: "Restored Lexicon",
    publicHref: "/lexicon",
    publicLabel: "View /lexicon",
  },
  {
    id: "positions",
    label: "Standing Positions",
    publicHref: "/positions",
    publicLabel: "View /positions",
  },
];

function formatTodayDisplay(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function emptyBlogPost(departments: Department[]): BlogPost {
  const firstDept = departments[0];
  return {
    slug: "",
    title: "",
    excerpt: "",
    date: formatTodayDisplay(),
    isoDate: new Date().toISOString().slice(0, 10),
    department: firstDept?.slug ?? "philosophy",
    category: "Research Note",
    author: firstDept ? `Department of ${firstDept.title}` : "African Hidden Voices",
    readingTime: "5 min read",
    keyClaim: "",
    relatedPositions: [],
    relatedTerms: [],
    sections: [
      {
        heading: "",
        paragraphs: [""],
      },
    ],
    sources: [{ label: "", href: "" }],
  };
}

function emptyWorkingPaper(nextIndex: number): WorkingPaper {
  const year = new Date().getFullYear();
  return {
    id: `AHV-WP-${year}-${String(nextIndex).padStart(2, "0")}`,
    title: "",
    author: "",
    department: "philosophy",
    date: formatTodayDisplay(),
    status: "Published",
    abstract: "",
    pdfUrl: "",
  };
}

function emptyConferencePaper(): ConferencePaper {
  return {
    title: "",
    author: "",
    venue: "",
    date: formatTodayDisplay(),
    source: { label: "", href: "" },
  };
}

function emptyConference(): Conference {
  return {
    date: formatTodayDisplay(),
    title: "",
    body: "",
    source: { label: "", href: "" },
  };
}

function emptyDatabaseRecord(): DatabaseRecord {
  return {
    name: "",
    slug: "",
    office: "Imboni",
    lifespan: "",
    place: "",
    country: "South Africa",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "",
    summary: "",
    notEstablished: "",
  };
}

function emptyPublication(): Publication {
  return {
    title: "",
    publisher: "Isambulo Publications",
    place: "Johannesburg",
    year: String(new Date().getFullYear()),
    isbn: "",
    byline: "",
    body: "",
  };
}

function emptyForthcoming(): ForthcomingPublication {
  return {
    title: "",
    author: "African Hidden Voices",
    body: "",
  };
}

function emptyAnnouncement(): Announcement {
  return {
    date: formatTodayDisplay(),
    category: "Research",
    title: "",
    body: "",
    source: { label: "", href: "" },
  };
}

function emptyLexiconEntry(): LexiconEntry {
  return {
    term: "",
    slug: "",
    gloss: "",
    definition: "",
    whatItIsNot: "",
    confirmationPending: false,
  };
}

function emptyPosition(nextNum: number): Position {
  return {
    number: String(nextNum).padStart(2, "0"),
    slug: "",
    title: "",
    position: "",
    ground: "",
    objection: "",
    answer: "",
    department: "philosophy",
  };
}

function ImageField({
  label,
  image,
  onChange,
}: {
  label: string;
  image?: ContentImage;
  onChange: (next: ContentImage | undefined) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = (await response.json()) as {
        ok: boolean;
        url?: string;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.url) {
        setUploadError(data.error ?? "Could not upload the image.");
        return;
      }
      onChange({
        src: data.url,
        alt:
          image?.alt ||
          file.name
            .replace(/\.[^.]+$/, "")
            .replace(/[-_]+/g, " ")
            .trim(),
        caption: image?.caption ?? "",
      });
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Could not upload the image.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3 border border-rule bg-paper p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-700">
          {label}
        </p>
        {image?.src && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="font-mono text-xs text-ash hover:text-brand-800"
          >
            Remove image
          </button>
        )}
      </div>

      {image?.src && (
        <div className="border border-rule bg-wash">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt || "Visual plate preview"}
            className="block max-h-52 w-full object-cover"
          />
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
            Upload image (JPG, PNG, WEBP, GIF, SVG, up to 10 MB)
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files?.[0])}
            className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-mono text-xs text-ink file:mr-3 file:border file:border-rule file:bg-paper file:px-3 file:py-1 file:font-mono file:text-xs"
          />
          {uploading && (
            <p className="mt-1 font-mono text-xs text-brand-700">Uploading...</p>
          )}
          {uploadError && (
            <p className="mt-1 font-mono text-xs text-brand-800">
              {uploadError}
            </p>
          )}
        </div>
        <div>
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
            Or image URL / path
          </label>
          <input
            type="text"
            value={image?.src ?? ""}
            onChange={(e) => {
              const src = e.target.value;
              if (!src) {
                onChange(undefined);
                return;
              }
              onChange({
                src,
                alt: image?.alt ?? "",
                caption: image?.caption ?? "",
              });
            }}
            placeholder="/images/plates/example.svg or https://..."
            className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-mono text-xs text-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
            Alt text (describes the image)
          </label>
          <input
            type="text"
            value={image?.alt ?? ""}
            onChange={(e) => {
              const alt = e.target.value;
              if (!image?.src) return;
              onChange({ ...image, alt });
            }}
            placeholder="e.g. Diagram of the two-crown governance order"
            className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-mono text-xs text-ink"
          />
        </div>
        <div>
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
            Caption (optional)
          </label>
          <input
            type="text"
            value={image?.caption ?? ""}
            onChange={(e) => {
              const caption = e.target.value;
              if (!image?.src) return;
              onChange({ ...image, caption });
            }}
            placeholder="e.g. Plate I · Department of AIS and Governance"
            className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-mono text-xs text-ink"
          />
        </div>
      </div>
    </div>
  );
}

function cleanImage(image?: ContentImage): ContentImage | undefined {
  if (!image?.src?.trim()) return undefined;
  return {
    src: image.src.trim(),
    alt: image.alt?.trim() || "African Hidden Voices visual plate",
    ...(image.caption?.trim() ? { caption: image.caption.trim() } : {}),
  };
}

export function AdminDashboard({
  initialStore,
  departments,
  initialAuthenticated,
  initialEmail,
}: {
  initialStore: CmsStore;
  departments: Department[];
  initialAuthenticated: boolean;
  initialEmail: string;
}) {
  const router = useRouter();
  const [store, setStore] = useState<CmsStore>(initialStore);
  const [activeTab, setActiveTab] = useState<AdminTab>("blog");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{
    tone: "ok" | "error";
    text: string;
  } | null>(null);

  /* ---------------- Authentication state ---------------- */
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [authEmail, setAuthEmail] = useState(initialEmail);
  const [loginEmail, setLoginEmail] = useState(DEFAULT_LOGIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credCurrentPassword, setCredCurrentPassword] = useState("");
  const [credNewEmail, setCredNewEmail] = useState(initialEmail);
  const [credNewPassword, setCredNewPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        email?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setAuthError(data.error ?? "Sign in failed.");
        return;
      }
      setAuthenticated(true);
      setAuthEmail(data.email ?? loginEmail);
      setLoginPassword("");
      setNotice({
        tone: "ok",
        text: "Signed in to the Editorial & Research Administration Desk.",
      });
      router.refresh();
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Network error while signing in.",
      );
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    setAuthBusy(true);
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      setAuthenticated(false);
      setLoginPassword("");
      setShowCredentials(false);
      setAuthBusy(false);
      router.refresh();
    }
  }

  async function handleUpdateCredentials(e: FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_credentials",
          currentPassword: credCurrentPassword,
          newEmail: credNewEmail,
          newPassword: credNewPassword,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        email?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setAuthError(data.error ?? "Could not update administrator details.");
        return;
      }
      setAuthEmail(data.email ?? credNewEmail);
      setCredCurrentPassword("");
      setCredNewPassword("");
      setShowCredentials(false);
      setNotice({
        tone: "ok",
        text: "Administrator sign-in details updated. Use the new details next time you sign in.",
      });
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Network error while updating.",
      );
    } finally {
      setAuthBusy(false);
    }
  }

  /* ---------------- Blog editor state ---------------- */
  const [blogDraft, setBlogDraft] = useState<BlogPost>(() =>
    emptyBlogPost(departments),
  );
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [blogFormOpen, setBlogFormOpen] = useState(false);

  /* ---------------- Research editor state ---------------- */
  const [researchSubTab, setResearchSubTab] = useState<
    "working" | "conferencePapers" | "conferences"
  >("working");
  const [wpDraft, setWpDraft] = useState<WorkingPaper>(() =>
    emptyWorkingPaper(initialStore.workingPapers.length + 1),
  );
  const [editingWpId, setEditingWpId] = useState<string | null>(null);
  const [wpFormOpen, setWpFormOpen] = useState(false);

  const [cpDraft, setCpDraft] = useState<ConferencePaper>(emptyConferencePaper);
  const [editingCpTitle, setEditingCpTitle] = useState<string | null>(null);
  const [cpFormOpen, setCpFormOpen] = useState(false);

  const [confDraft, setConfDraft] = useState<Conference>(emptyConference);
  const [editingConfTitle, setEditingConfTitle] = useState<string | null>(null);
  const [confFormOpen, setConfFormOpen] = useState(false);

  /* ---------------- Database editor state ---------------- */
  const [dbDraft, setDbDraft] = useState<DatabaseRecord>(emptyDatabaseRecord);
  const [editingDbSlug, setEditingDbSlug] = useState<string | null>(null);
  const [dbFormOpen, setDbFormOpen] = useState(false);

  /* ---------------- Publications editor state ---------------- */
  const [pubDraft, setPubDraft] = useState<Publication>(emptyPublication);
  const [editingPubIsbn, setEditingPubIsbn] = useState<string | null>(null);
  const [pubFormOpen, setPubFormOpen] = useState(false);

  const [forthDraft, setForthDraft] =
    useState<ForthcomingPublication>(emptyForthcoming);
  const [editingForthTitle, setEditingForthTitle] = useState<string | null>(
    null,
  );
  const [forthFormOpen, setForthFormOpen] = useState(false);

  /* ---------------- Newsroom editor state ---------------- */
  const [annDraft, setAnnDraft] = useState<Announcement>(emptyAnnouncement);
  const [editingAnnTitle, setEditingAnnTitle] = useState<string | null>(null);
  const [annFormOpen, setAnnFormOpen] = useState(false);

  /* ---------------- Lexicon editor state ---------------- */
  const [lexDraft, setLexDraft] = useState<LexiconEntry>(emptyLexiconEntry);
  const [editingLexSlug, setEditingLexSlug] = useState<string | null>(null);
  const [lexFormOpen, setLexFormOpen] = useState(false);

  /* ---------------- Positions editor state ---------------- */
  const [posDraft, setPosDraft] = useState<Position>(() =>
    emptyPosition(initialStore.positions.length + 1),
  );
  const [editingPosSlug, setEditingPosSlug] = useState<string | null>(null);
  const [posFormOpen, setPosFormOpen] = useState(false);

  /* ---------------- API helper ---------------- */
  async function mutateStore(
    payload: Record<string, unknown>,
    successMessage: string,
  ): Promise<boolean> {
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        store?: CmsStore;
        error?: string;
      };
      if (response.status === 401) {
        setAuthenticated(false);
        setNotice({
          tone: "error",
          text: "Your administrator session has expired. Please sign in again.",
        });
        return false;
      }
      if (!response.ok || !data.ok || !data.store) {
        setNotice({
          tone: "error",
          text: data.error ?? "Could not save changes.",
        });
        return false;
      }
      setStore(data.store);
      setNotice({ tone: "ok", text: successMessage });
      router.refresh();
      return true;
    } catch (err) {
      setNotice({
        tone: "error",
        text: err instanceof Error ? err.message : "Network error.",
      });
      return false;
    } finally {
      setSaving(false);
    }
  }

  /* ---------------- House-style live inspection ---------------- */
  const activeDraftText = useMemo(() => {
    if (activeTab === "blog" && blogFormOpen) {
      return JSON.stringify(blogDraft);
    }
    if (activeTab === "research") {
      if (wpFormOpen) return JSON.stringify(wpDraft);
      if (cpFormOpen) return JSON.stringify(cpDraft);
      if (confFormOpen) return JSON.stringify(confDraft);
    }
    if (activeTab === "database" && dbFormOpen) return JSON.stringify(dbDraft);
    if (activeTab === "publications") {
      if (pubFormOpen) return JSON.stringify(pubDraft);
      if (forthFormOpen) return JSON.stringify(forthDraft);
    }
    if (activeTab === "newsroom" && annFormOpen) return JSON.stringify(annDraft);
    if (activeTab === "lexicon" && lexFormOpen) return JSON.stringify(lexDraft);
    if (activeTab === "positions" && posFormOpen) return JSON.stringify(posDraft);
    return "";
  }, [
    activeTab,
    blogFormOpen,
    blogDraft,
    wpFormOpen,
    wpDraft,
    cpFormOpen,
    cpDraft,
    confFormOpen,
    confDraft,
    dbFormOpen,
    dbDraft,
    pubFormOpen,
    pubDraft,
    forthFormOpen,
    forthDraft,
    annFormOpen,
    annDraft,
    lexFormOpen,
    lexDraft,
    posFormOpen,
    posDraft,
  ]);

  const styleIssues: StyleIssue[] = useMemo(() => {
    if (!activeDraftText) return [];
    return checkHouseStyleText(activeDraftText);
  }, [activeDraftText]);

  function exportStoreJson() {
    const blob = new Blob([JSON.stringify(store, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ahv-cms-store-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const currentTabMeta = TABS.find((t) => t.id === activeTab)!;

  /* ================================================================
     ADMINISTRATOR SIGN-IN GATE
  ================================================================ */
  if (!authenticated) {
    return (
      <div className="mx-auto max-w-xl">
        <form
          onSubmit={handleLogin}
          className="space-y-6 border-2 border-ink/85 bg-wash p-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-700">
              Restricted · Administrator Access
            </p>
            <h2 className="mt-2 font-serif text-2xl text-ink">
              Sign in to the Content &amp; Research Desk
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-ink-soft">
              The administration desk publishes and manages essays, research
              papers, database records, publications, announcements, lexicon
              entries and standing positions. Access is restricted to
              authorised AHV editors and researchers.
            </p>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2.5 font-sans text-sm text-ink"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
              Password
            </label>
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2.5 font-sans text-sm text-ink"
            />
          </div>

          {authError && (
            <p className="border-l-2 border-brand-800 bg-paper px-3 py-2 font-mono text-xs text-brand-800">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={authBusy}
            className="w-full bg-brand-800 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-brand-900 disabled:opacity-60"
          >
            {authBusy ? "Verifying..." : "Sign in"}
          </button>

          <p className="border-t border-rule pt-4 font-mono text-xs leading-relaxed text-ash">
            Default sign-in: admin@africanhiddenvoices.co.za · AHV-Admin-2026.
            Sign in first, then use Administrator Settings to change the email
            and password to your own private credentials.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Account bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-rule bg-wash px-4 py-3">
        <p className="font-mono text-xs text-ink-soft">
          Signed in as{" "}
          <span className="text-ink">{authEmail}</span>
          {" · "}authorised editor, AHV Editorial &amp; Research Administration
          Desk
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCredentials((prev) => !prev)}
            className="border border-rule bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft hover:border-brand-700 hover:text-ink"
          >
            {showCredentials ? "Close settings" : "Administrator settings"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={authBusy}
            className="border border-brand-800 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-brand-800 hover:bg-brand-800 hover:text-paper"
          >
            Sign out
          </button>
        </div>
      </div>

      {showCredentials && (
        <form
          onSubmit={handleUpdateCredentials}
          className="space-y-4 border border-rule bg-wash p-5"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-700">
              Administrator Settings
            </p>
            <p className="mt-1 font-serif text-sm text-ink-soft">
              Change the sign-in email and password for this desk. Your current
              password is required to confirm the change.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                Current password
              </label>
              <input
                type="password"
                required
                value={credCurrentPassword}
                onChange={(e) => setCredCurrentPassword(e.target.value)}
                className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
              />
            </div>
            <div>
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                New email
              </label>
              <input
                type="email"
                required
                value={credNewEmail}
                onChange={(e) => setCredNewEmail(e.target.value)}
                className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
              />
            </div>
            <div>
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                New password (6 characters or more)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={credNewPassword}
                onChange={(e) => setCredNewPassword(e.target.value)}
                className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
              />
            </div>
          </div>
          {authError && (
            <p className="border-l-2 border-brand-800 bg-paper px-3 py-2 font-mono text-xs text-brand-800">
              {authError}
            </p>
          )}
          <button
            type="submit"
            disabled={authBusy}
            className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-brand-900 disabled:opacity-60"
          >
            {authBusy ? "Saving..." : "Save sign-in details"}
          </button>
        </form>
      )}
      {/* Summary bar */}
      <div className="grid gap-4 border-b border-rule pb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-rule bg-wash p-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            Blog & Essays
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            {store.blogPosts.length}
          </p>
          <p className="mt-1 font-mono text-xs text-ash">
            Published on <Link href="/blog" className="link-brand">/blog</Link>
          </p>
        </div>

        <div className="border border-rule bg-wash p-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            Research Output
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            {store.workingPapers.length +
              store.conferencePapers.length +
              store.conferences.length}
          </p>
          <p className="mt-1 font-mono text-xs text-ash">
            {store.workingPapers.length} working ·{" "}
            {store.conferencePapers.length} conference papers
          </p>
        </div>

        <div className="border border-rule bg-wash p-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            Iimboni Database
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            {store.databaseRecords.length}
          </p>
          <p className="mt-1 font-mono text-xs text-ash">
            Across{" "}
            {new Set(store.databaseRecords.map((r) => r.country)).size}{" "}
            countries
          </p>
        </div>

        <div className="border border-rule bg-wash p-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            Lexicon & Positions
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            {store.lexicon.length} / {store.positions.length}
          </p>
          <p className="mt-1 font-mono text-xs text-ash">
            {store.lexicon.length} terms · {store.positions.length} positions
          </p>
        </div>
      </div>

      {/* Status banner */}
      {notice && (
        <div
          role="status"
          className={`flex items-center justify-between gap-4 border-l-2 px-5 py-4 ${
            notice.tone === "ok"
              ? "border-verdigris bg-wash text-ink"
              : "border-brand-700 bg-brand-50 text-brand-900"
          }`}
        >
          <p className="font-serif text-sm">{notice.text}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="font-mono text-xs uppercase tracking-[0.12em] text-ash hover:text-ink"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation tabs and utilities */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
        <nav aria-label="Admin collections" className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setNotice(null);
                }}
                className={`border px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-brand-800 bg-brand-800 text-paper"
                    : "border-rule bg-paper text-ink-soft hover:border-brand-700 hover:text-brand-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={currentTabMeta.publicHref}
            className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
          >
            {currentTabMeta.publicLabel} →
          </Link>
          <button
            type="button"
            onClick={exportStoreJson}
            className="border border-rule bg-paper px-3 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            Export JSON
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              if (
                window.confirm(
                  "Reset all collections to the canonical packages/content baseline?",
                )
              ) {
                void mutateStore(
                  { action: "reset" },
                  "Store reset to the canonical packages/content baseline.",
                );
              }
            }}
            className="border border-rule bg-paper px-3 py-1.5 font-mono text-xs text-ash transition-colors hover:border-brand-700 hover:text-brand-800"
          >
            Reset baseline
          </button>
        </div>
      </div>

      {/* Live House-Style Checker alert when a form is open */}
      {activeDraftText && (
        <div
          className={`border px-5 py-4 ${
            styleIssues.length === 0
              ? "border-verdigris/40 bg-wash"
              : "border-ochre bg-wash"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
              House-style check (izwi lilandela umoya)
            </p>
            {styleIssues.length === 0 ? (
              <span className="font-mono text-xs text-verdigris">
                ✓ Passes house style (no em dashes, no restricted terms)
              </span>
            ) : (
              <span className="font-mono text-xs text-brand-800">
                ! {styleIssues.length} item(s) to review before publishing
              </span>
            )}
          </div>
          {styleIssues.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-rule pt-3 font-mono text-xs text-ink-soft">
              {styleIssues.map((issue, idx) => (
                <li key={idx}>
                  <span
                    className={
                      issue.kind === "error"
                        ? "font-semibold text-brand-800"
                        : "font-semibold text-ochre"
                    }
                  >
                    [{issue.kind.toUpperCase()}]
                  </span>{" "}
                  {issue.message} {issue.suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ================================================================
          1. BLOG & ESSAYS TAB
      ================================================================ */}
      {activeTab === "blog" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Blog Essays & Research Notes ({store.blogPosts.length})
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Published essays appear immediately on{" "}
                <Link href="/blog" className="link-brand">
                  /blog
                </Link>
                , on their home department page, on the Newsroom page, and on
                the Home page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlogDraft(emptyBlogPost(departments));
                setEditingBlogSlug(null);
                setBlogFormOpen(true);
              }}
              className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-brand-900"
            >
              + New blog essay
            </button>
          </div>

          {blogFormOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const finalSlug =
                  blogDraft.slug.trim() || slugify(blogDraft.title);
                if (!blogDraft.title.trim() || !finalSlug) {
                  setNotice({
                    tone: "error",
                    text: "Please provide a title for the essay.",
                  });
                  return;
                }
                const cleanedSections: BlogSection[] = blogDraft.sections
                  .map((s) => ({
                    ...(s.heading?.trim()
                      ? { heading: sanitiseDashes(s.heading.trim()) }
                      : {}),
                    paragraphs: s.paragraphs
                      .map((p) => sanitiseDashes(p.trim()))
                      .filter(Boolean),
                    ...(s.quote?.text?.trim() && s.quote?.attribution?.trim()
                      ? {
                          quote: {
                            text: sanitiseDashes(s.quote.text.trim()),
                            attribution: sanitiseDashes(
                              s.quote.attribution.trim(),
                            ),
                          },
                        }
                      : {}),
                    ...(cleanImage(s.image) ? { image: cleanImage(s.image)! } : {}),
                  }))
                  .filter((s) => s.paragraphs.length > 0);

                const cleanedSources: BlogSource[] = blogDraft.sources
                  .map((src) => ({
                    label: sanitiseDashes(src.label.trim()),
                    ...(src.href?.trim() ? { href: src.href.trim() } : {}),
                  }))
                  .filter((src) => src.label.length > 0);

                const itemToSave: BlogPost = {
                  ...blogDraft,
                  slug: finalSlug,
                  title: sanitiseDashes(blogDraft.title.trim()),
                  excerpt: sanitiseDashes(blogDraft.excerpt.trim()),
                  keyClaim: sanitiseDashes(blogDraft.keyClaim.trim()),
                  ...(cleanImage(blogDraft.image)
                    ? { image: cleanImage(blogDraft.image)! }
                    : { image: undefined }),
                  sections:
                    cleanedSections.length > 0
                      ? cleanedSections
                      : [
                          {
                            paragraphs: [
                              sanitiseDashes(blogDraft.excerpt.trim()),
                            ],
                          },
                        ],
                  sources:
                    cleanedSources.length > 0
                      ? cleanedSources
                      : [
                          {
                            label:
                              "African Hidden Voices Research Institution, Johannesburg",
                          },
                        ],
                };

                const ok = await mutateStore(
                  {
                    action: "upsert_item",
                    collection: "blogPosts",
                    matchKey: "slug",
                    originalKey: editingBlogSlug ?? finalSlug,
                    item: itemToSave,
                  },
                  editingBlogSlug
                    ? `Updated essay "${itemToSave.title}".`
                    : `Published new essay "${itemToSave.title}" at /blog/${itemToSave.slug}.`,
                );
                if (ok) {
                  setBlogFormOpen(false);
                  setEditingBlogSlug(null);
                }
              }}
              className="space-y-6 border-2 border-ink/85 bg-wash p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
                <h3 className="font-serif text-xl text-ink">
                  {editingBlogSlug
                    ? `Editing essay: ${blogDraft.title}`
                    : "Publish a new blog essay or research note"}
                </h3>
                <button
                  type="button"
                  onClick={() => setBlogFormOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-ash hover:text-ink"
                >
                  Cancel
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Essay Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogDraft.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setBlogDraft((prev) => ({
                        ...prev,
                        title,
                        slug: editingBlogSlug ? prev.slug : slugify(title),
                      }));
                    }}
                    placeholder="e.g. The Linguistic Test in African Indigenous Spirituality"
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2.5 font-serif text-base text-ink"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogDraft.slug}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        slug: slugify(e.target.value),
                      }))
                    }
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2 font-mono text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Department *
                  </label>
                  <select
                    value={blogDraft.department}
                    onChange={(e) => {
                      const dept = departments.find(
                        (d) => d.slug === e.target.value,
                      );
                      setBlogDraft((prev) => ({
                        ...prev,
                        department: e.target.value,
                        author: dept
                          ? `Department of ${dept.title}`
                          : prev.author,
                      }));
                    }}
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2 font-sans text-sm text-ink"
                  >
                    {departments.map((dept) => (
                      <option key={dept.slug} value={dept.slug}>
                        {dept.number} · {dept.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Category Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogDraft.category}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="e.g. Epistemology, Governance & Law, Lexicography"
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2 font-mono text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Author / Research Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogDraft.author}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2 font-sans text-sm text-ink"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Display Date (House style: 15 May 2026) *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogDraft.date}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2 font-mono text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    ISO Date & Reading Time
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={blogDraft.isoDate}
                      onChange={(e) =>
                        setBlogDraft((prev) => ({
                          ...prev,
                          isoDate: e.target.value,
                        }))
                      }
                      className="border border-rule bg-paper px-2.5 py-2 font-mono text-xs text-ink"
                    />
                    <input
                      type="text"
                      value={blogDraft.readingTime}
                      onChange={(e) =>
                        setBlogDraft((prev) => ({
                          ...prev,
                          readingTime: e.target.value,
                        }))
                      }
                      placeholder="6 min read"
                      className="border border-rule bg-paper px-2.5 py-2 font-mono text-xs text-ink"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Summary / Excerpt *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={blogDraft.excerpt}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    placeholder="Two-sentence summary shown on the blog hub and in metadata."
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2.5 font-serif text-base text-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-brand-700">
                    Central Claim (Single-sentence thesis) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={blogDraft.keyClaim}
                    onChange={(e) =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        keyClaim: e.target.value,
                      }))
                    }
                    placeholder="State the central claim of this essay in one clear sentence."
                    className="mt-1.5 w-full border border-rule bg-paper px-3.5 py-2.5 font-serif text-base text-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageField
                    label="Featured Image / Plate (shown on /blog and at the head of the essay)"
                    image={blogDraft.image}
                    onChange={(next) =>
                      setBlogDraft((prev) => ({ ...prev, image: next }))
                    }
                  />
                </div>
              </div>

              {/* Sections editor */}
              <div className="space-y-4 border-t border-rule pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-700">
                    Essay Sections ({blogDraft.sections.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        sections: [
                          ...prev.sections,
                          { heading: "", paragraphs: [""] },
                        ],
                      }))
                    }
                    className="border border-rule bg-paper px-3 py-1 font-mono text-xs text-ink hover:border-brand-700"
                  >
                    + Add section
                  </button>
                </div>

                {blogDraft.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="space-y-3 border border-rule bg-paper p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-brand-700">
                        Section {String(sIdx + 1).padStart(2, "0")}
                      </span>
                      {blogDraft.sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setBlogDraft((prev) => ({
                              ...prev,
                              sections: prev.sections.filter(
                                (_, idx) => idx !== sIdx,
                              ),
                            }))
                          }
                          className="font-mono text-xs text-ash hover:text-brand-800"
                        >
                          Remove section
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                        Section Subheading (optional for opening section)
                      </label>
                      <input
                        type="text"
                        value={section.heading ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBlogDraft((prev) => {
                            const next = [...prev.sections];
                            next[sIdx] = { ...next[sIdx], heading: val };
                            return { ...prev, sections: next };
                          });
                        }}
                        className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-serif text-base text-ink"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                        Paragraphs (separate paragraphs with a blank line) *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={section.paragraphs.join("\n\n")}
                        onChange={(e) => {
                          const paras = e.target.value.split(/\n{2,}/);
                          setBlogDraft((prev) => {
                            const next = [...prev.sections];
                            next[sIdx] = { ...next[sIdx], paragraphs: paras };
                            return { ...prev, sections: next };
                          });
                        }}
                        className="mt-1 w-full border border-rule bg-wash px-3 py-2 font-serif text-base leading-relaxed text-ink"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                          Block Quotation (optional)
                        </label>
                        <input
                          type="text"
                          value={section.quote?.text ?? ""}
                          onChange={(e) => {
                            const text = e.target.value;
                            setBlogDraft((prev) => {
                              const next = [...prev.sections];
                              next[sIdx] = {
                                ...next[sIdx],
                                quote: {
                                  text,
                                  attribution:
                                    next[sIdx].quote?.attribution ?? "",
                                },
                              };
                              return { ...prev, sections: next };
                            });
                          }}
                          placeholder="Exact quoted text"
                          className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-serif text-sm text-ink"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                          Quotation Attribution (Author, work, page)
                        </label>
                        <input
                          type="text"
                          value={section.quote?.attribution ?? ""}
                          onChange={(e) => {
                            const attribution = e.target.value;
                            setBlogDraft((prev) => {
                              const next = [...prev.sections];
                              next[sIdx] = {
                                ...next[sIdx],
                                quote: {
                                  text: next[sIdx].quote?.text ?? "",
                                  attribution,
                                },
                              };
                              return { ...prev, sections: next };
                            });
                          }}
                          placeholder="e.g. African Hidden Voices 2024, p. 3"
                          className="mt-1 w-full border border-rule bg-wash px-3 py-1.5 font-mono text-xs text-ink"
                        />
                      </div>
                    </div>

                    <ImageField
                      label={`Section ${String(sIdx + 1).padStart(2, "0")} Image / Diagram (optional)`}
                      image={section.image}
                      onChange={(next) => {
                        setBlogDraft((prev) => {
                          const nextSections = [...prev.sections];
                          nextSections[sIdx] = {
                            ...nextSections[sIdx],
                            image: next,
                          };
                          return { ...prev, sections: nextSections };
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Related positions & lexicon terms */}
              <div className="grid gap-6 border-t border-rule pt-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                    Standing Positions Engaged
                  </p>
                  <div className="mt-2 max-h-44 space-y-1.5 overflow-y-auto border border-rule bg-paper p-3">
                    {store.positions.map((pos) => {
                      const checked = blogDraft.relatedPositions.includes(
                        pos.slug,
                      );
                      return (
                        <label
                          key={pos.slug}
                          className="flex items-baseline gap-2 font-serif text-sm text-ink-soft"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setBlogDraft((prev) => ({
                                ...prev,
                                relatedPositions: isChecked
                                  ? [...prev.relatedPositions, pos.slug]
                                  : prev.relatedPositions.filter(
                                      (s) => s !== pos.slug,
                                    ),
                              }));
                            }}
                          />
                          <span className="font-mono text-xs text-brand-700">
                            {pos.number}
                          </span>
                          <span>{pos.title}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                    Restored Lexicon Terms Used
                  </p>
                  <div className="mt-2 max-h-44 space-y-1.5 overflow-y-auto border border-rule bg-paper p-3">
                    {store.lexicon.map((term) => {
                      const checked = blogDraft.relatedTerms.includes(
                        term.slug,
                      );
                      return (
                        <label
                          key={term.slug}
                          className="flex items-baseline gap-2 font-serif text-sm text-ink-soft"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setBlogDraft((prev) => ({
                                ...prev,
                                relatedTerms: isChecked
                                  ? [...prev.relatedTerms, term.slug]
                                  : prev.relatedTerms.filter(
                                      (s) => s !== term.slug,
                                    ),
                              }));
                            }}
                          />
                          <span className="italic text-ink">{term.term}</span>
                          <span className="font-mono text-xs text-ash">
                            ({term.gloss})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sources editor */}
              <div className="space-y-3 border-t border-rule pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-700">
                    Sources & Citations *
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setBlogDraft((prev) => ({
                        ...prev,
                        sources: [...prev.sources, { label: "", href: "" }],
                      }))
                    }
                    className="border border-rule bg-paper px-3 py-1 font-mono text-xs text-ink hover:border-brand-700"
                  >
                    + Add source
                  </button>
                </div>

                {blogDraft.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="grid gap-3 sm:grid-cols-[1.5fr_1fr_auto]"
                  >
                    <input
                      type="text"
                      required={idx === 0}
                      value={src.label}
                      onChange={(e) => {
                        const label = e.target.value;
                        setBlogDraft((prev) => {
                          const next = [...prev.sources];
                          next[idx] = { ...next[idx], label };
                          return { ...prev, sources: next };
                        });
                      }}
                      placeholder="Source citation (e.g. Restoring Africa's Spiritual Identity, 2024, p. 141)"
                      className="border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                    />
                    <input
                      type="url"
                      value={src.href ?? ""}
                      onChange={(e) => {
                        const href = e.target.value;
                        setBlogDraft((prev) => {
                          const next = [...prev.sources];
                          next[idx] = { ...next[idx], href };
                          return { ...prev, sources: next };
                        });
                      }}
                      placeholder="https://... (optional supporting link)"
                      className="border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                    />
                    {blogDraft.sources.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setBlogDraft((prev) => ({
                            ...prev,
                            sources: prev.sources.filter((_, i) => i !== idx),
                          }))
                        }
                        className="px-2 font-mono text-xs text-ash hover:text-brand-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-4 border-t border-rule pt-5">
                <button
                  type="button"
                  onClick={() => setBlogFormOpen(false)}
                  className="border border-rule bg-paper px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-800 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-brand-900 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingBlogSlug
                      ? "Save changes"
                      : "Publish essay"}
                </button>
              </div>
            </form>
          )}

          {/* Existing Blog Posts List */}
          <div className="divide-y divide-rule border-y border-rule">
            {store.blogPosts.map((post) => {
              const dept = departments.find((d) => d.slug === post.department);
              return (
                <article
                  key={post.slug}
                  className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-start"
                >
                  <div className="flex max-w-2xl items-start gap-4">
                    {post.image?.src && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image.src}
                        alt={post.image.alt || post.title}
                        loading="lazy"
                        className="h-20 w-28 shrink-0 border border-rule object-cover"
                      />
                    )}
                    <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs font-semibold text-brand-700">
                        {post.date}
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ochre">
                        {post.category}
                      </span>
                      {dept && (
                        <span className="font-mono text-xs text-ash">
                          · {dept.title}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 font-serif text-xl text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-800"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-serif text-sm text-ink-soft">
                      {post.excerpt}
                    </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-ink-soft hover:border-ink hover:text-ink"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogDraft(structuredClone(post));
                        setEditingBlogSlug(post.slug);
                        setBlogFormOpen(true);
                      }}
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700 hover:border-brand-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete essay "${post.title}" from the blog?`,
                          )
                        ) {
                          void mutateStore(
                            {
                              action: "delete_item",
                              collection: "blogPosts",
                              matchKey: "slug",
                              keyValue: post.slug,
                            },
                            `Deleted essay "${post.title}".`,
                          );
                        }
                      }}
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:border-brand-800 hover:text-brand-800"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================
          2. RESEARCH & PAPERS TAB
      ================================================================ */}
      {activeTab === "research" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Research Programme: Working Papers, Conference Papers & Appearances
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Manage items shown on{" "}
                <Link href="/research" className="link-brand">
                  /research
                </Link>{" "}
                and{" "}
                <Link href="/institution/record" className="link-brand">
                  /institution/record
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setResearchSubTab("working")}
                className={`border px-3 py-1.5 font-mono text-xs ${
                  researchSubTab === "working"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-ink-soft"
                }`}
              >
                Working Papers ({store.workingPapers.length})
              </button>
              <button
                type="button"
                onClick={() => setResearchSubTab("conferencePapers")}
                className={`border px-3 py-1.5 font-mono text-xs ${
                  researchSubTab === "conferencePapers"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-ink-soft"
                }`}
              >
                Conference Papers ({store.conferencePapers.length})
              </button>
              <button
                type="button"
                onClick={() => setResearchSubTab("conferences")}
                className={`border px-3 py-1.5 font-mono text-xs ${
                  researchSubTab === "conferences"
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-ink-soft"
                }`}
              >
                Conference Appearances ({store.conferences.length})
              </button>
            </div>
          </div>

          {/* 2A. Working Papers */}
          {researchSubTab === "working" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">
                  Working Papers (AHV-WP Series)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setWpDraft(
                      emptyWorkingPaper(store.workingPapers.length + 1),
                    );
                    setEditingWpId(null);
                    setWpFormOpen(true);
                  }}
                  className="bg-brand-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-brand-900"
                >
                  + Add working paper
                </button>
              </div>

              {wpFormOpen && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const item: WorkingPaper = {
                      id: sanitiseDashes(wpDraft.id.trim()),
                      title: sanitiseDashes(wpDraft.title.trim()),
                      author: sanitiseDashes(wpDraft.author.trim()),
                      department: wpDraft.department,
                      date: sanitiseDashes(wpDraft.date.trim()),
                      status: wpDraft.status,
                      abstract: sanitiseDashes(wpDraft.abstract.trim()),
                      ...(wpDraft.pdfUrl?.trim()
                        ? { pdfUrl: wpDraft.pdfUrl.trim() }
                        : {}),
                      ...(cleanImage(wpDraft.image)
                        ? { image: cleanImage(wpDraft.image)! }
                        : {}),
                    };
                    const ok = await mutateStore(
                      {
                        action: "upsert_item",
                        collection: "workingPapers",
                        matchKey: "id",
                        originalKey: editingWpId ?? item.id,
                        item,
                      },
                      `Saved working paper ${item.id}.`,
                    );
                    if (ok) {
                      setWpFormOpen(false);
                      setEditingWpId(null);
                    }
                  }}
                  className="space-y-4 border-2 border-ink/85 bg-wash p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Number (AHV-WP-[year]-[nn]) *
                      </label>
                      <input
                        type="text"
                        required
                        value={wpDraft.id}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            id: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Department *
                      </label>
                      <select
                        value={wpDraft.department}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            department: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                      >
                        {departments.map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {d.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Status *
                      </label>
                      <select
                        value={wpDraft.status}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            status: e.target.value as WorkingPaper["status"],
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      >
                        <option value="Published">Published</option>
                        <option value="In preparation">In preparation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={wpDraft.title}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Author *
                      </label>
                      <input
                        type="text"
                        required
                        value={wpDraft.author}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={wpDraft.date}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Abstract *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={wpDraft.abstract}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            abstract: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        PDF Link (optional, shown when status is Published)
                      </label>
                      <input
                        type="url"
                        value={wpDraft.pdfUrl ?? ""}
                        onChange={(e) =>
                          setWpDraft((prev) => ({
                            ...prev,
                            pdfUrl: e.target.value,
                          }))
                        }
                        placeholder="https://..."
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                  </div>

                  <ImageField
                    label="Cover Plate / Diagram (optional)"
                    image={wpDraft.image}
                    onChange={(next) =>
                      setWpDraft((prev) => ({ ...prev, image: next }))
                    }
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setWpFormOpen(false)}
                      className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                    >
                      Save working paper
                    </button>
                  </div>
                </form>
              )}

              {store.workingPapers.length === 0 ? (
                <p className="border border-rule bg-wash p-6 font-serif text-sm text-ash">
                  No working papers added yet. Click &ldquo;+ Add working
                  paper&rdquo; above to publish the first paper in the AHV-WP
                  series on <Link href="/research" className="link-brand">/research</Link>.
                </p>
              ) : (
                <div className="divide-y divide-rule border-y border-rule">
                  {store.workingPapers.map((wp) => (
                    <div
                      key={wp.id}
                      className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
                    >
                      <div className="flex items-start gap-4">
                        {wp.image?.src && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={wp.image.src}
                            alt={wp.image.alt || wp.title}
                            loading="lazy"
                            className="h-16 w-24 shrink-0 border border-rule object-cover"
                          />
                        )}
                        <div className="min-w-0">
                        <span className="font-mono text-xs font-semibold text-brand-700">
                          {wp.id} · {wp.status}
                        </span>
                        <h4 className="mt-1 font-serif text-lg text-ink">
                          {wp.title}
                        </h4>
                        <p className="mt-1 font-mono text-xs text-ash">
                          {wp.author} · {wp.date}
                        </p>
                        <p className="mt-2 max-w-2xl font-serif text-sm text-ink-soft">
                          {wp.abstract}
                        </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setWpDraft(structuredClone(wp));
                            setEditingWpId(wp.id);
                            setWpFormOpen(true);
                          }}
                          className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void mutateStore(
                              {
                                action: "delete_item",
                                collection: "workingPapers",
                                matchKey: "id",
                                keyValue: wp.id,
                              },
                              `Removed working paper ${wp.id}.`,
                            )
                          }
                          className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2B. Conference Papers */}
          {researchSubTab === "conferencePapers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">
                  Conference Papers ({store.conferencePapers.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setCpDraft(emptyConferencePaper());
                    setEditingCpTitle(null);
                    setCpFormOpen(true);
                  }}
                  className="bg-brand-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-brand-900"
                >
                  + Add conference paper
                </button>
              </div>

              {cpFormOpen && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const item: ConferencePaper = {
                      title: sanitiseDashes(cpDraft.title.trim()),
                      author: sanitiseDashes(cpDraft.author.trim()),
                      venue: sanitiseDashes(cpDraft.venue.trim()),
                      date: sanitiseDashes(cpDraft.date.trim()),
                      ...(cpDraft.source?.label?.trim() &&
                      cpDraft.source?.href?.trim()
                        ? {
                            source: {
                              label: sanitiseDashes(
                                cpDraft.source.label.trim(),
                              ),
                              href: cpDraft.source.href.trim(),
                            },
                          }
                        : {}),
                      ...(cleanImage(cpDraft.image)
                        ? { image: cleanImage(cpDraft.image)! }
                        : {}),
                    };
                    const ok = await mutateStore(
                      {
                        action: "upsert_item",
                        collection: "conferencePapers",
                        matchKey: "title",
                        originalKey: editingCpTitle ?? item.title,
                        item,
                      },
                      `Saved conference paper "${item.title}".`,
                    );
                    if (ok) {
                      setCpFormOpen(false);
                      setEditingCpTitle(null);
                    }
                  }}
                  className="space-y-4 border-2 border-ink/85 bg-wash p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Paper Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={cpDraft.title}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Author *
                      </label>
                      <input
                        type="text"
                        required
                        value={cpDraft.author}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={cpDraft.date}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Conference & Venue *
                      </label>
                      <input
                        type="text"
                        required
                        value={cpDraft.venue}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            venue: e.target.value,
                          }))
                        }
                        placeholder="e.g. CESNUR International Conference, Cape Town"
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Programme / Source Label (optional)
                      </label>
                      <input
                        type="text"
                        value={cpDraft.source?.label ?? ""}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            source: {
                              label: e.target.value,
                              href: prev.source?.href ?? "",
                            },
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Programme / Source URL (optional)
                      </label>
                      <input
                        type="url"
                        value={cpDraft.source?.href ?? ""}
                        onChange={(e) =>
                          setCpDraft((prev) => ({
                            ...prev,
                            source: {
                              label: prev.source?.label ?? "",
                              href: e.target.value,
                            },
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                  </div>

                  <ImageField
                    label="Photograph / Plate (optional)"
                    image={cpDraft.image}
                    onChange={(next) =>
                      setCpDraft((prev) => ({ ...prev, image: next }))
                    }
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCpFormOpen(false)}
                      className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                    >
                      Save conference paper
                    </button>
                  </div>
                </form>
              )}

              <div className="divide-y divide-rule border-y border-rule">
                {store.conferencePapers.map((cp) => (
                  <div
                    key={cp.title}
                    className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
                  >
                    <div>
                      <h4 className="font-serif text-lg text-ink">
                        {cp.title}
                      </h4>
                      <p className="mt-1 font-mono text-xs text-ash">
                        {cp.author} · {cp.venue} · {cp.date}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCpDraft({
                            ...structuredClone(cp),
                            source: cp.source ?? { label: "", href: "" },
                          });
                          setEditingCpTitle(cp.title);
                          setCpFormOpen(true);
                        }}
                        className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void mutateStore(
                            {
                              action: "delete_item",
                              collection: "conferencePapers",
                              matchKey: "title",
                              keyValue: cp.title,
                            },
                            `Removed conference paper "${cp.title}".`,
                          )
                        }
                        className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2C. Conference Appearances */}
          {researchSubTab === "conferences" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">
                  Institutional Conference Appearances ({store.conferences.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setConfDraft(emptyConference());
                    setEditingConfTitle(null);
                    setConfFormOpen(true);
                  }}
                  className="bg-brand-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-brand-900"
                >
                  + Add conference appearance
                </button>
              </div>

              {confFormOpen && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const item: Conference = {
                      date: sanitiseDashes(confDraft.date.trim()),
                      title: sanitiseDashes(confDraft.title.trim()),
                      body: sanitiseDashes(confDraft.body.trim()),
                      ...(confDraft.source?.label?.trim() &&
                      confDraft.source?.href?.trim()
                        ? {
                            source: {
                              label: sanitiseDashes(
                                confDraft.source.label.trim(),
                              ),
                              href: confDraft.source.href.trim(),
                            },
                          }
                        : {}),
                      ...(cleanImage(confDraft.image)
                        ? { image: cleanImage(confDraft.image)! }
                        : {}),
                    };
                    const ok = await mutateStore(
                      {
                        action: "upsert_item",
                        collection: "conferences",
                        matchKey: "title",
                        originalKey: editingConfTitle ?? item.title,
                        item,
                      },
                      `Saved conference appearance "${item.title}".`,
                    );
                    if (ok) {
                      setConfFormOpen(false);
                      setEditingConfTitle(null);
                    }
                  }}
                  className="space-y-4 border-2 border-ink/85 bg-wash p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Conference Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={confDraft.title}
                        onChange={(e) =>
                          setConfDraft((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={confDraft.date}
                        onChange={(e) =>
                          setConfDraft((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Summary of AHV Participation *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={confDraft.body}
                        onChange={(e) =>
                          setConfDraft((prev) => ({
                            ...prev,
                            body: e.target.value,
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Source Label
                      </label>
                      <input
                        type="text"
                        value={confDraft.source?.label ?? ""}
                        onChange={(e) =>
                          setConfDraft((prev) => ({
                            ...prev,
                            source: {
                              label: e.target.value,
                              href: prev.source?.href ?? "",
                            },
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                        Source URL
                      </label>
                      <input
                        type="url"
                        value={confDraft.source?.href ?? ""}
                        onChange={(e) =>
                          setConfDraft((prev) => ({
                            ...prev,
                            source: {
                              label: prev.source?.label ?? "",
                              href: e.target.value,
                            },
                          }))
                        }
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                  </div>

                  <ImageField
                    label="Conference Photograph / Plate (optional)"
                    image={confDraft.image}
                    onChange={(next) =>
                      setConfDraft((prev) => ({ ...prev, image: next }))
                    }
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setConfFormOpen(false)}
                      className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                    >
                      Save appearance
                    </button>
                  </div>
                </form>
              )}

              <div className="divide-y divide-rule border-y border-rule">
                {store.conferences.map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
                  >
                    <div className="max-w-2xl">
                      <span className="font-mono text-xs font-semibold text-brand-700">
                        {c.date}
                      </span>
                      <h4 className="mt-1 font-serif text-lg text-ink">
                        {c.title}
                      </h4>
                      <p className="mt-1 font-serif text-sm text-ink-soft">
                        {c.body}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setConfDraft({
                            ...structuredClone(c),
                            source: c.source ?? { label: "", href: "" },
                          });
                          setEditingConfTitle(c.title);
                          setConfFormOpen(true);
                        }}
                        className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void mutateStore(
                            {
                              action: "delete_item",
                              collection: "conferences",
                              matchKey: "title",
                              keyValue: c.title,
                            },
                            `Removed conference "${c.title}".`,
                          )
                        }
                        className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================
          3. IIMBONI DATABASE TAB
      ================================================================ */}
      {activeTab === "database" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                The Iimboni Database ({store.databaseRecords.length} records)
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Every record carries the compulsory field stating what the
                evidence does not yet establish.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDbDraft(emptyDatabaseRecord());
                setEditingDbSlug(null);
                setDbFormOpen(true);
              }}
              className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-brand-900"
            >
              + Add database record
            </button>
          </div>

          {dbFormOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const slug = dbDraft.slug.trim() || slugify(dbDraft.name);
                const item: DatabaseRecord = {
                  ...dbDraft,
                  slug,
                  name: sanitiseDashes(dbDraft.name.trim()),
                  office: sanitiseDashes(dbDraft.office.trim()),
                  lifespan: sanitiseDashes(dbDraft.lifespan.trim()),
                  place: sanitiseDashes(dbDraft.place.trim()),
                  country: sanitiseDashes(dbDraft.country.trim()),
                  colonialLabel: sanitiseDashes(dbDraft.colonialLabel.trim()),
                  summary: sanitiseDashes(dbDraft.summary.trim()),
                  notEstablished: sanitiseDashes(dbDraft.notEstablished.trim()),
                  ...(cleanImage(dbDraft.image)
                    ? { image: cleanImage(dbDraft.image)! }
                    : {}),
                };
                const ok = await mutateStore(
                  {
                    action: "upsert_item",
                    collection: "databaseRecords",
                    matchKey: "slug",
                    originalKey: editingDbSlug ?? item.slug,
                    item,
                  },
                  `Saved Iimboni Database record for ${item.name}.`,
                );
                if (ok) {
                  setDbFormOpen(false);
                  setEditingDbSlug(null);
                }
              }}
              className="space-y-4 border-2 border-ink/85 bg-wash p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={dbDraft.name}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        name: e.target.value,
                        slug: editingDbSlug
                          ? prev.slug
                          : slugify(e.target.value),
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Office (in its own terms) *
                  </label>
                  <input
                    type="text"
                    required
                    value={dbDraft.office}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        office: e.target.value,
                      }))
                    }
                    placeholder="e.g. Imboni and founder of an institution"
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Lifespan (use &lsquo;to&rsquo;, never a dash) *
                  </label>
                  <input
                    type="text"
                    required
                    value={dbDraft.lifespan}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        lifespan: e.target.value,
                      }))
                    }
                    placeholder="e.g. 1875 to 1935, or born 1887"
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Verification Status *
                  </label>
                  <select
                    value={dbDraft.status}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        status: e.target.value as RecordStatus,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Single source">Single source</option>
                    <option value="Under verification">
                      Under verification
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Place *
                  </label>
                  <input
                    type="text"
                    required
                    value={dbDraft.place}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        place: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={dbDraft.country}
                      onChange={(e) =>
                        setDbDraft((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Region *
                    </label>
                    <select
                      value={dbDraft.region}
                      onChange={(e) =>
                        setDbDraft((prev) => ({
                          ...prev,
                          region: e.target.value as DatabaseRecord["region"],
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                    >
                      <option value="Southern Africa">Southern Africa</option>
                      <option value="Central Africa">Central Africa</option>
                      <option value="East Africa">East Africa</option>
                      <option value="West Africa">West Africa</option>
                      <option value="North Africa">North Africa</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Named in the colonial and mission record as *
                  </label>
                  <input
                    type="text"
                    required
                    value={dbDraft.colonialLabel}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        colonialLabel: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Research Summary *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={dbDraft.summary}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        summary: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-brand-800">
                    What is not established (Compulsory) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={dbDraft.notEstablished}
                    onChange={(e) =>
                      setDbDraft((prev) => ({
                        ...prev,
                        notEstablished: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
              </div>

              <ImageField
                label="Archival Plate / Portrait (optional)"
                image={dbDraft.image}
                onChange={(next) =>
                  setDbDraft((prev) => ({ ...prev, image: next }))
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDbFormOpen(false)}
                  className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                >
                  Save record
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-rule border-y border-rule">
            {store.databaseRecords.map((record) => (
              <div
                key={record.slug}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
              >
                <div className="flex max-w-2xl items-start gap-4">
                  {record.image?.src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={record.image.src}
                      alt={record.image.alt || record.name}
                      loading="lazy"
                      className="h-16 w-24 shrink-0 border border-rule object-cover"
                    />
                  )}
                  <div className="min-w-0">
                  <span className="font-mono text-xs text-brand-700">
                    {record.status} · {record.country}
                  </span>
                  <h3 className="mt-1 font-serif text-xl text-ink">
                    {record.name}
                  </h3>
                  <p className="font-mono text-xs text-ash">
                    {record.office} · {record.lifespan} · {record.place}
                  </p>
                  <p className="mt-2 font-serif text-sm text-ink-soft">
                    {record.summary}
                  </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDbDraft(structuredClone(record));
                      setEditingDbSlug(record.slug);
                      setDbFormOpen(true);
                    }}
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void mutateStore(
                        {
                          action: "delete_item",
                          collection: "databaseRecords",
                          matchKey: "slug",
                          keyValue: record.slug,
                        },
                        `Removed database record for ${record.name}.`,
                      )
                    }
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          4. PUBLICATIONS TAB
      ================================================================ */}
      {activeTab === "publications" && (
        <div className="space-y-10">
          {/* Published books */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-ink">
                  Published Books ({store.publications.length})
                </h2>
                <p className="mt-1 font-serif text-sm text-ash">
                  Every published book carries its ISBN and publisher record.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPubDraft(emptyPublication());
                  setEditingPubIsbn(null);
                  setPubFormOpen(true);
                }}
                className="bg-brand-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
              >
                + Add published book
              </button>
            </div>

            {pubFormOpen && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const item: Publication = {
                    title: sanitiseDashes(pubDraft.title.trim()),
                    publisher: sanitiseDashes(pubDraft.publisher.trim()),
                    place: sanitiseDashes(pubDraft.place.trim()),
                    year: pubDraft.year.trim(),
                    isbn: pubDraft.isbn.trim(),
                    ...(pubDraft.byline?.trim()
                      ? { byline: sanitiseDashes(pubDraft.byline.trim()) }
                      : {}),
                    body: sanitiseDashes(pubDraft.body.trim()),
                    ...(cleanImage(pubDraft.image)
                      ? { image: cleanImage(pubDraft.image)! }
                      : {}),
                  };
                  const ok = await mutateStore(
                    {
                      action: "upsert_item",
                      collection: "publications",
                      matchKey: "isbn",
                      originalKey: editingPubIsbn ?? item.isbn,
                      item,
                    },
                    `Saved publication "${item.title}".`,
                  );
                  if (ok) {
                    setPubFormOpen(false);
                    setEditingPubIsbn(null);
                  }
                }}
                className="space-y-4 border-2 border-ink/85 bg-wash p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={pubDraft.title}
                      onChange={(e) =>
                        setPubDraft((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Publisher *
                    </label>
                    <input
                      type="text"
                      required
                      value={pubDraft.publisher}
                      onChange={(e) =>
                        setPubDraft((prev) => ({
                          ...prev,
                          publisher: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Place & Year *
                    </label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={pubDraft.place}
                        onChange={(e) =>
                          setPubDraft((prev) => ({
                            ...prev,
                            place: e.target.value,
                          }))
                        }
                        className="border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                      />
                      <input
                        type="text"
                        required
                        value={pubDraft.year}
                        onChange={(e) =>
                          setPubDraft((prev) => ({
                            ...prev,
                            year: e.target.value,
                          }))
                        }
                        className="border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      ISBN *
                    </label>
                    <input
                      type="text"
                      required
                      value={pubDraft.isbn}
                      onChange={(e) =>
                        setPubDraft((prev) => ({
                          ...prev,
                          isbn: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Preface / Byline (optional)
                    </label>
                    <input
                      type="text"
                      value={pubDraft.byline ?? ""}
                      onChange={(e) =>
                        setPubDraft((prev) => ({
                          ...prev,
                          byline: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-sm text-ink"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Description & Citation Record *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={pubDraft.body}
                      onChange={(e) =>
                        setPubDraft((prev) => ({
                          ...prev,
                          body: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                    />
                  </div>
                </div>

                <ImageField
                  label="Book Cover / Plate (optional)"
                  image={pubDraft.image}
                  onChange={(next) =>
                    setPubDraft((prev) => ({ ...prev, image: next }))
                  }
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPubFormOpen(false)}
                    className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                  >
                    Save book
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-rule border-y border-rule">
              {store.publications.map((book) => (
                <div
                  key={book.isbn}
                  className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
                >
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-xl text-ink">
                      {book.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-ash">
                      {book.publisher}, {book.place}, {book.year} · ISBN{" "}
                      {book.isbn}
                    </p>
                    <p className="mt-2 font-serif text-sm text-ink-soft">
                      {book.body}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPubDraft(structuredClone(book));
                        setEditingPubIsbn(book.isbn);
                        setPubFormOpen(true);
                      }}
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void mutateStore(
                          {
                            action: "delete_item",
                            collection: "publications",
                            matchKey: "isbn",
                            keyValue: book.isbn,
                          },
                          `Removed "${book.title}".`,
                        )
                      }
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In preparation */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-ink">
                Volumes in Preparation ({store.forthcomingPublications.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  setForthDraft(emptyForthcoming());
                  setEditingForthTitle(null);
                  setForthFormOpen(true);
                }}
                className="border border-ink bg-paper px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:bg-wash"
              >
                + Add forthcoming volume
              </button>
            </div>

            {forthFormOpen && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const item: ForthcomingPublication = {
                    title: sanitiseDashes(forthDraft.title.trim()),
                    author: sanitiseDashes(forthDraft.author.trim()),
                    body: sanitiseDashes(forthDraft.body.trim()),
                    ...(cleanImage(forthDraft.image)
                      ? { image: cleanImage(forthDraft.image)! }
                      : {}),
                  };
                  const ok = await mutateStore(
                    {
                      action: "upsert_item",
                      collection: "forthcomingPublications",
                      matchKey: "title",
                      originalKey: editingForthTitle ?? item.title,
                      item,
                    },
                    `Saved forthcoming volume "${item.title}".`,
                  );
                  if (ok) {
                    setForthFormOpen(false);
                    setEditingForthTitle(null);
                  }
                }}
                className="space-y-4 border-2 border-ink/85 bg-wash p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={forthDraft.title}
                      onChange={(e) =>
                        setForthDraft((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Author *
                    </label>
                    <input
                      type="text"
                      required
                      value={forthDraft.author}
                      onChange={(e) =>
                        setForthDraft((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={forthDraft.body}
                      onChange={(e) =>
                        setForthDraft((prev) => ({
                          ...prev,
                          body: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                    />
                  </div>
                </div>

                <ImageField
                  label="Cover Plate (optional)"
                  image={forthDraft.image}
                  onChange={(next) =>
                    setForthDraft((prev) => ({ ...prev, image: next }))
                  }
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setForthFormOpen(false)}
                    className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                  >
                    Save volume
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-rule border-y border-rule">
              {store.forthcomingPublications.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
                >
                  <div className="max-w-2xl">
                    <h4 className="font-serif text-lg text-ink">
                      {item.title}
                    </h4>
                    <p className="font-mono text-xs text-ash">{item.author}</p>
                    <p className="mt-2 font-serif text-sm text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setForthDraft(structuredClone(item));
                        setEditingForthTitle(item.title);
                        setForthFormOpen(true);
                      }}
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void mutateStore(
                          {
                            action: "delete_item",
                            collection: "forthcomingPublications",
                            matchKey: "title",
                            keyValue: item.title,
                          },
                          `Removed "${item.title}".`,
                        )
                      }
                      className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          5. NEWSROOM TAB
      ================================================================ */}
      {activeTab === "newsroom" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Newsroom Announcements ({store.announcements.length})
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Every announcement carries a date, category and checkable
                source.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAnnDraft(emptyAnnouncement());
                setEditingAnnTitle(null);
                setAnnFormOpen(true);
              }}
              className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper"
            >
              + Add announcement
            </button>
          </div>

          {annFormOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const item: Announcement = {
                  date: sanitiseDashes(annDraft.date.trim()),
                  category: sanitiseDashes(annDraft.category.trim()),
                  title: sanitiseDashes(annDraft.title.trim()),
                  body: sanitiseDashes(annDraft.body.trim()),
                  ...(annDraft.source?.label?.trim() &&
                  annDraft.source?.href?.trim()
                    ? {
                        source: {
                          label: sanitiseDashes(annDraft.source.label.trim()),
                          href: annDraft.source.href.trim(),
                        },
                      }
                    : {}),
                  ...(cleanImage(annDraft.image)
                    ? { image: cleanImage(annDraft.image)! }
                    : {}),
                };
                const ok = await mutateStore(
                  {
                    action: "upsert_item",
                    collection: "announcements",
                    matchKey: "title",
                    originalKey: editingAnnTitle ?? item.title,
                    item,
                  },
                  `Saved announcement "${item.title}".`,
                );
                if (ok) {
                  setAnnFormOpen(false);
                  setEditingAnnTitle(null);
                }
              }}
              className="space-y-4 border-2 border-ink/85 bg-wash p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={annDraft.date}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={annDraft.category}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Recognition, Partnership, Conference, Publication"
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={annDraft.title}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Release Body *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={annDraft.body}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Source Label
                  </label>
                  <input
                    type="text"
                    value={annDraft.source?.label ?? ""}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        source: {
                          label: e.target.value,
                          href: prev.source?.href ?? "",
                        },
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Source URL
                  </label>
                  <input
                    type="url"
                    value={annDraft.source?.href ?? ""}
                    onChange={(e) =>
                      setAnnDraft((prev) => ({
                        ...prev,
                        source: {
                          label: prev.source?.label ?? "",
                          href: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
              </div>

              <ImageField
                label="Announcement Image / Photograph (optional)"
                image={annDraft.image}
                onChange={(next) =>
                  setAnnDraft((prev) => ({ ...prev, image: next }))
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAnnFormOpen(false)}
                  className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                >
                  Save announcement
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-rule border-y border-rule">
            {store.announcements.map((ann) => (
              <div
                key={ann.title}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
              >
                <div className="max-w-2xl">
                  <span className="font-mono text-xs text-brand-700">
                    {ann.date} · {ann.category}
                  </span>
                  <h3 className="mt-1 font-serif text-xl text-ink">
                    {ann.title}
                  </h3>
                  <p className="mt-2 font-serif text-sm text-ink-soft">
                    {ann.body}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAnnDraft({
                        ...structuredClone(ann),
                        source: ann.source ?? { label: "", href: "" },
                      });
                      setEditingAnnTitle(ann.title);
                      setAnnFormOpen(true);
                    }}
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void mutateStore(
                        {
                          action: "delete_item",
                          collection: "announcements",
                          matchKey: "title",
                          keyValue: ann.title,
                        },
                        `Removed announcement "${ann.title}".`,
                      )
                    }
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          6. RESTORED LEXICON TAB
      ================================================================ */}
      {activeTab === "lexicon" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Restored Lexicon ({store.lexicon.length} terms)
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Defined from within AIS, never through imported religious
                etymology.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLexDraft(emptyLexiconEntry());
                setEditingLexSlug(null);
                setLexFormOpen(true);
              }}
              className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper"
            >
              + Add lexicon term
            </button>
          </div>

          {lexFormOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const slug = lexDraft.slug.trim() || slugify(lexDraft.term);
                const item: LexiconEntry = {
                  term: sanitiseDashes(lexDraft.term.trim()),
                  slug,
                  gloss: sanitiseDashes(lexDraft.gloss.trim()),
                  definition: sanitiseDashes(lexDraft.definition.trim()),
                  whatItIsNot: sanitiseDashes(lexDraft.whatItIsNot.trim()),
                  ...(lexDraft.confirmationPending
                    ? { confirmationPending: true }
                    : {}),
                  ...(cleanImage(lexDraft.image)
                    ? { image: cleanImage(lexDraft.image)! }
                    : {}),
                };
                const ok = await mutateStore(
                  {
                    action: "upsert_item",
                    collection: "lexicon",
                    matchKey: "slug",
                    originalKey: editingLexSlug ?? item.slug,
                    item,
                  },
                  `Saved lexicon entry "${item.term}".`,
                );
                if (ok) {
                  setLexFormOpen(false);
                  setEditingLexSlug(null);
                }
              }}
              className="space-y-4 border-2 border-ink/85 bg-wash p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Indigenous Term *
                  </label>
                  <input
                    type="text"
                    required
                    value={lexDraft.term}
                    onChange={(e) =>
                      setLexDraft((prev) => ({
                        ...prev,
                        term: e.target.value,
                        slug: editingLexSlug
                          ? prev.slug
                          : slugify(e.target.value),
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base italic text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    English Gloss *
                  </label>
                  <input
                    type="text"
                    required
                    value={lexDraft.gloss}
                    onChange={(e) =>
                      setLexDraft((prev) => ({
                        ...prev,
                        gloss: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Definition (from within AIS) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={lexDraft.definition}
                    onChange={(e) =>
                      setLexDraft((prev) => ({
                        ...prev,
                        definition: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    What it is not (the mistranslation and why it fails) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={lexDraft.whatItIsNot}
                    onChange={(e) =>
                      setLexDraft((prev) => ({
                        ...prev,
                        whatItIsNot: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <label className="flex items-center gap-2 font-mono text-xs text-ink-soft sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={Boolean(lexDraft.confirmationPending)}
                    onChange={(e) =>
                      setLexDraft((prev) => ({
                        ...prev,
                        confirmationPending: e.target.checked,
                      }))
                    }
                  />
                  Mark as &ldquo;For confirmation&rdquo; (definition drawn from
                  corpus, awaiting final settlement)
                </label>
              </div>

              <ImageField
                label="Term Plate / Diagram (optional)"
                image={lexDraft.image}
                onChange={(next) =>
                  setLexDraft((prev) => ({ ...prev, image: next }))
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setLexFormOpen(false)}
                  className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                >
                  Save term
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-rule border-y border-rule">
            {store.lexicon.map((entry) => (
              <div
                key={entry.slug}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
              >
                <div className="max-w-2xl">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-xl italic text-ink">
                      {entry.term}
                    </h3>
                    <span className="font-mono text-xs text-brand-700">
                      {entry.gloss}
                    </span>
                  </div>
                  <p className="mt-1.5 font-serif text-sm text-ink-soft">
                    {entry.definition}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLexDraft(structuredClone(entry));
                      setEditingLexSlug(entry.slug);
                      setLexFormOpen(true);
                    }}
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void mutateStore(
                        {
                          action: "delete_item",
                          collection: "lexicon",
                          matchKey: "slug",
                          keyValue: entry.slug,
                        },
                        `Removed lexicon term "${entry.term}".`,
                      )
                    }
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          7. STANDING POSITIONS TAB
      ================================================================ */}
      {activeTab === "positions" && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Standing Positions ({store.positions.length})
              </h2>
              <p className="mt-1 font-serif text-sm text-ash">
                Each position is published alongside the strongest objection
                against it and AHV&rsquo;s answer.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPosDraft(emptyPosition(store.positions.length + 1));
                setEditingPosSlug(null);
                setPosFormOpen(true);
              }}
              className="bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper"
            >
              + Add standing position
            </button>
          </div>

          {posFormOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const slug = posDraft.slug.trim() || slugify(posDraft.title);
                const item: Position = {
                  number: posDraft.number.trim(),
                  slug,
                  title: sanitiseDashes(posDraft.title.trim()),
                  position: sanitiseDashes(posDraft.position.trim()),
                  ground: sanitiseDashes(posDraft.ground.trim()),
                  objection: sanitiseDashes(posDraft.objection.trim()),
                  answer: sanitiseDashes(posDraft.answer.trim()),
                  department: posDraft.department,
                  ...(cleanImage(posDraft.image)
                    ? { image: cleanImage(posDraft.image)! }
                    : {}),
                };
                const ok = await mutateStore(
                  {
                    action: "upsert_item",
                    collection: "positions",
                    matchKey: "slug",
                    originalKey: editingPosSlug ?? item.slug,
                    item,
                  },
                  `Saved standing position ${item.number}: ${item.title}.`,
                );
                if (ok) {
                  setPosFormOpen(false);
                  setEditingPosSlug(null);
                }
              }}
              className="space-y-4 border-2 border-ink/85 bg-wash p-6"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Number (e.g. 11) *
                  </label>
                  <input
                    type="text"
                    required
                    value={posDraft.number}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-mono text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={posDraft.title}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        title: e.target.value,
                        slug: editingPosSlug
                          ? prev.slug
                          : slugify(e.target.value),
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Department *
                  </label>
                  <select
                    value={posDraft.department}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-sans text-sm text-ink"
                  >
                    {departments.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    The Position *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={posDraft.position}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    The Ground *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={posDraft.ground}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        ground: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    The Objection, at Full Strength *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={posDraft.objection}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        objection: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-mono text-xs uppercase tracking-[0.12em] text-brand-700">
                    AHV&rsquo;s Answer *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={posDraft.answer}
                    onChange={(e) =>
                      setPosDraft((prev) => ({
                        ...prev,
                        answer: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border border-rule bg-paper px-3 py-2 font-serif text-base text-ink"
                  />
                </div>
              </div>

              <ImageField
                label="Conceptual Diagram / Plate (optional)"
                image={posDraft.image}
                onChange={(next) =>
                  setPosDraft((prev) => ({ ...prev, image: next }))
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPosFormOpen(false)}
                  className="border border-rule bg-paper px-4 py-2 font-mono text-xs uppercase text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-800 px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper"
                >
                  Save position
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-rule border-y border-rule">
            {store.positions.map((pos) => (
              <div
                key={pos.slug}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-start"
              >
                <div className="max-w-2xl">
                  <span className="font-mono text-xs font-semibold text-brand-700">
                    Position {pos.number}
                  </span>
                  <h3 className="mt-1 font-serif text-xl text-ink">
                    {pos.title}
                  </h3>
                  <p className="mt-1.5 font-serif text-sm text-ink-soft">
                    {pos.position}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPosDraft(structuredClone(pos));
                      setEditingPosSlug(pos.slug);
                      setPosFormOpen(true);
                    }}
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-brand-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void mutateStore(
                        {
                          action: "delete_item",
                          collection: "positions",
                          matchKey: "slug",
                          keyValue: pos.slug,
                        },
                        `Removed position "${pos.title}".`,
                      )
                    }
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-ash hover:text-brand-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
