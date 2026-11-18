import { useReducedMotion } from "framer-motion";
import { AmbientVideo } from "./AmbientVideo";
import { ShaderField } from "./ShaderField";
import { FactStrip } from "./FactStrip";
import { RevealLine } from "./ui/Reveal";
import { featured, profile } from "../data/projects";

function SpecCard() {
  const rows = [
    { k: "Now building", v: `${featured.name} ${featured.version}` },
    { k: "Focus", v: "AI agent observability" },
    { k: "Stack", v: "Python · TypeScript · React" },
    { k: "Based", v: profile.location },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(52,211,153,0.10),transparent_70%)] blur-xl" />
      <div className="glass overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            signal
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-mint/90">
            <span className="h-1 w-1 rounded-full bg-mint" />
            live
          </span>
        </div>

        <dl className="divide-y divide-white/[0.05]">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-6 px-5 py-3.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                {r.k}
              </dt>
              <dd className="text-right text-[13px] leading-snug text-white/75">{r.v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center gap-2 border-t border-white/[0.07] px-5 py-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-60 [animation:pulse-ring_2.6s_ease-out_infinite]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/40">
            open to interesting problems
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="grain relative isolate min-h-[100svh] overflow-hidden">
      <AmbientVideo />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "radial-gradient(58% 55% at 72% 26%, #000 0%, rgba(0,0,0,0.5) 50%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(58% 55% at 72% 26%, #000 0%, rgba(0,0,0,0.5) 50%, transparent 78%)",
        }}
      >
        <ShaderField className="h-full w-full opacity-90 mix-blend-screen" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 dotgrid opacity-[0.18]"
        style={{
          maskImage: "radial-gradient(85% 70% at 50% 30%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(85% 70% at 50% 30%, #000 20%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1340px] flex-col px-6 pt-28 md:px-10 md:pt-32">
        <div className="flex flex-1 items-center pb-12 md:pb-16">
          <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_356px] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-mint to-transparent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mint/85 md:text-[11px]">
                  Developer tools · open source
                </span>
              </div>

              <h1 className="mt-7 font-display text-[clamp(2.55rem,7.4vw,5.9rem)] font-medium leading-[0.94] tracking-[-0.038em] text-white">
                <RevealLine delay={0.05}>Software that</RevealLine>
                <RevealLine delay={0.14}>refuses to be</RevealLine>
                <RevealLine delay={0.23}>
                  <span className="text-gradient">a black box.</span>
                </RevealLine>
              </h1>

              <p className="mt-7 max-w-[56ch] text-[15px] leading-[1.75] text-white/60 md:text-[16.5px]">
                I'm <span className="text-white/90">Kojo</span>, a self-taught developer. I build
                tools that make powerful systems legible — receipts, guards and interfaces for the
                machines that now write our code. My main project,{" "}
                <span className="text-white/90">RunLedger</span>, gives AI coding agents a flight
                recorder.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#e9eef3] px-5 py-3 text-[13.5px] font-medium text-[#060a0e] transition-all duration-300 hover:bg-white sm:w-auto"
                >
                  <span className="relative z-10">Explore the work</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-[13.5px] text-white/75 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  {profile.githubLabel}
                  <span className="text-white/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/60">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <SpecCard />
            </div>
          </div>
        </div>

        <FactStrip />
      </div>

      {!reduce && <span className="sr-only">Decorative animated background.</span>}
    </section>
  );
}
