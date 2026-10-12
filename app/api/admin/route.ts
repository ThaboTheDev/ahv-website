import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import {
  getCmsStore,
  resetCmsStore,
  saveCmsStore,
  type CmsStore,
} from "@/lib/cms";

type CollectionKey = Exclude<keyof CmsStore, "updatedAt">;

const PREPEND_COLLECTIONS = new Set<CollectionKey>([
  "blogPosts",
  "workingPapers",
  "conferencePapers",
  "conferences",
  "announcements",
]);

export async function GET() {
  const store = getCmsStore();
  return NextResponse.json({ ok: true, store });
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please sign in as an administrator to modify content.",
        },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      action: "upsert_item" | "delete_item" | "save_collection" | "reset";
      collection?: CollectionKey;
      item?: Record<string, unknown>;
      items?: unknown[];
      matchKey?: string;
      originalKey?: string;
      keyValue?: string;
    };

    if (body.action === "reset") {
      const store = resetCmsStore();
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, store });
    }

    const store = getCmsStore();
    const collection = body.collection;

    if (!collection || !(collection in store)) {
      return NextResponse.json(
        { ok: false, error: "Invalid collection specified." },
        { status: 400 },
      );
    }

    if (body.action === "save_collection" && Array.isArray(body.items)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (store as any)[collection] = body.items;
      const saved = saveCmsStore(store);
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, store: saved });
    }

    const list = [...(store[collection] as unknown as Record<string, unknown>[])];
    const matchKey = body.matchKey ?? "slug";

    if (body.action === "upsert_item" && body.item) {
      const lookupVal = String(body.originalKey ?? body.item[matchKey] ?? "");
      const existingIndex = list.findIndex(
        (entry) => String(entry[matchKey] ?? "") === lookupVal,
      );

      if (existingIndex >= 0) {
        list[existingIndex] = body.item;
      } else if (PREPEND_COLLECTIONS.has(collection)) {
        list.unshift(body.item);
      } else {
        list.push(body.item);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (store as any)[collection] = list;
      const saved = saveCmsStore(store);
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, store: saved });
    }

    if (body.action === "delete_item" && body.keyValue !== undefined) {
      const filtered = list.filter(
        (entry) => String(entry[matchKey] ?? "") !== String(body.keyValue),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (store as any)[collection] = filtered;
      const saved = saveCmsStore(store);
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, store: saved });
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported admin action." },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to update store.",
      },
      { status: 500 },
    );
  }
}
