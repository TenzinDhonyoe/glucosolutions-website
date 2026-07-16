import { SignalFunnel } from "./SignalFunnel";

/* Capabilities — the signal-funnel centerpiece: every logged signal converging
   into one personalized dashboard view. */
export function Capabilities() {
  return (
    <section className="overflow-x-clip pb-20 md:pb-28">
      <SignalFunnel />
    </section>
  );
}
