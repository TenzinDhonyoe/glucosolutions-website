// design-sync shim for next/navigation client hooks used in previews.
export const usePathname = () => "/";
export const useRouter = () => ({ push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {} });
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const redirect = (_url?: string) => {};
export const notFound = () => {};
