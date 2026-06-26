// design-sync shim for next/font/google & next/font/local loaders.
const make = () => ({ className: "", variable: "", style: { fontFamily: "var(--font-sans)" } });
const handler: any = new Proxy(function () { return make(); }, {
  get: () => () => make(),
  apply: () => make(),
});
export default handler;
export const Inter = () => make();
export const Fraunces = () => make();
export const JetBrains_Mono = () => make();
