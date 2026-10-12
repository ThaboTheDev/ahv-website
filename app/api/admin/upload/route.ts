import { NextResponse } from "next/server";
import { mkdirSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { getAdminSession } from "@/lib/admin-auth";

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        { ok: false, error: "Please sign in as an administrator to upload images." },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No image file provided." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image exceeds the 10 MB upload limit." },
        { status: 400 },
      );
    }

    const rawExt = extname(file.name).toLowerCase() || ".png";
    const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : ".png";
    const safeStem =
      file.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 48) || "plate";

    const filename = `${Date.now()}-${safeStem}${ext}`;
    const uploadsDir = resolve(process.cwd(), "public/uploads");
    mkdirSync(uploadsDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(resolve(uploadsDir, filename), buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to upload image.",
      },
      { status: 500 },
    );
  }
}
