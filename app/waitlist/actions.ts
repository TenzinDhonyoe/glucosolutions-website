"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const Schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  source: z.string().max(64).optional(),
  referrer: z.string().max(512).optional(),
  hp: z.string().max(0).optional(),
});

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

async function checkRateLimit(ip: string): Promise<boolean> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return true;
  }
  try {
    const { kv } = await import("@vercel/kv");
    const key = `waitlist:${ip}`;
    const count = await kv.incr(key);
    if (count === 1) await kv.expire(key, 3600);
    return count <= 3;
  } catch {
    return true;
  }
}

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData
): Promise<WaitlistResult> {
  const parsed = Schema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? undefined,
    referrer: formData.get("referrer") ?? undefined,
    hp: formData.get("hp") ?? undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error:
        parsed.error.issues[0]?.message ?? "Please check your submission.",
    };
  }

  if (parsed.data.hp) {
    return { ok: true };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";

  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return {
      ok: false,
      error: "Too many submissions. Try again in an hour.",
    };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      ok: false,
      error: "Waitlist is temporarily unavailable. Please try again later.",
    };
  }

  const { error } = await supabase.from("waitlist").insert({
    email: parsed.data.email,
    source: parsed.data.source ?? "website",
    referrer: parsed.data.referrer ?? null,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: true };
    }
    console.error("[waitlist] insert error", error);
    return {
      ok: false,
      error: "Something went wrong. Please try again.",
    };
  }

  return { ok: true };
}
