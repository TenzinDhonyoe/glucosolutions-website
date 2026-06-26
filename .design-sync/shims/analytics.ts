// design-sync shim: no-op analytics so posthog/vercel never load in previews.
export const track = (_event?: string, _props?: Record<string, any>) => {};
export const identify = (_id?: string, _props?: Record<string, any>) => {};
export default { track, identify };
