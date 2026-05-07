function resolveLastModified(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_BUILD_TIME ??
    process.env.VERCEL_GIT_COMMIT_DATE ??
    process.env.SOURCE_DATE_EPOCH;
  if (fromEnv) {
    const asNumber = Number(fromEnv);
    if (!Number.isNaN(asNumber) && asNumber > 0) {
      return new Date(asNumber * 1000).toISOString();
    }
    const asDate = new Date(fromEnv);
    if (!Number.isNaN(asDate.getTime())) {
      return asDate.toISOString();
    }
  }
  return BAKED_BUILD_DATE;
}

const BAKED_BUILD_DATE = "2026-05-07T00:00:00.000Z";

export const LAST_MODIFIED: string = resolveLastModified();

export const LEGAL_LAST_MODIFIED = "2026-05-07";
