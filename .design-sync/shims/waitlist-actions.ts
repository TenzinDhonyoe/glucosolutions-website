// design-sync shim for the Waitlist server action used by the preview.
export type WaitlistResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };
export async function joinWaitlist(_prev: any, _formData: FormData): Promise<WaitlistResult> {
  return { ok: true, message: "You're on the list." };
}
