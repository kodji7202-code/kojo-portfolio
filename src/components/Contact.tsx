import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { profile } from "../data/projects";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.top = "-1000px";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyEmailButton() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const reduce = useReducedMotion();

  async function onClick() {
    const ok = await copyText(profile.email);
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      aria-label={`Copy email address ${profile.email}`}
      className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] px-5 py-5 text-left transition-all duration-500 hover:border-mint/30 hover:bg-white/[0.04] md:px-7 md:py-6"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(52,211,153,0.10)_45%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="relative">
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.24em] text-white/30">
          email
        </span>
        <span className="mt-1.5 block break-all font-display text-[17px] tracking-[-0.01em] text-white/90 md:text-[21px]">
          {profile.email}
        </span>
      </span>

      <span className="relative flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 group-hover:border-mint/30 group-hover:text-mint">
        <AnimatePresence mode="wait" initial={false}>
          {state === "copied" ? (
            <motion.span
              key="copied"
              className="flex items-center gap-2 text-mint"
              initial={reduce ? undefined : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m3 8.5 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              copied
            </motion.span>
          ) : state === "failed" ? (
            <motion.span key="failed" className="text-amber-300">
              select &amp; copy
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2"
              initial={reduce ? undefined : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
                <path d="M10.5 3.5H4.5a1 1 0 0 0-1 1v6" strokeLinecap="round" />
              </svg>
              copy
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

const socials = [
  {
    label: "GitHub",
    handle: profile.githubLabel,
    href: profile.github,
    icon: (
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    ),
  },
  {
    label: "X",
    handle: profile.xLabel,
    href: profile.x,
    icon: (
      <path d="M12.6 1.5h2.4l-5.2 6 6.2 7h-4.9L7.4 9.6l-4.2 4.9H.8l5.6-6.4L.4 1.5h5l3.4 3.2 3.8-3.2Zm-.9 11.2h1.3L4.4 2.7H3l8.7 10Z" />
    ),
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 105%, rgba(52,211,153,0.14), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 linegrid opacity-[0.3]" />

      <div className="relative mx-auto w-full max-w-[1340px] px-6 md:px-10">
        <Reveal>
          <SectionLabel index="04">Contact</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Reveal delay={0.04}>
              <h2 className="font-display text-[clamp(2.05rem,4.6vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.038em] text-white">
                Let's build something
                <br />
                <span className="text-gradient">worth verifying.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[46ch] text-[14.5px] leading-[1.8] text-white/50">
                Open to collaborations, developer tooling and conversations about AI agents that
                behave. Here's the fastest way to reach me — I read everything.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                {profile.location}
              </p>
            </Reveal>
          </div>

          <div className="space-y-3">
            <Reveal delay={0.08}>
              <CopyEmailButton />
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {socials.map((s, i) => (
                <Reveal key={s.label} delay={0.14 + i * 0.05}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#080b10]/80 px-5 py-4 transition-all duration-500 hover:border-white/20 hover:bg-[#0b1117]"
                  >
                    <span className="flex items-center gap-3">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 fill-white/50 transition-colors duration-300 group-hover:fill-mint">
                        {s.icon}
                      </svg>
                      <span>
                        <span className="block text-[13px] text-white/80">{s.label}</span>
                        <span className="mt-0.5 block font-mono text-[9.5px] text-white/30">
                          {s.handle}
                        </span>
                      </span>
                    </span>
                    <span className="text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60">
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
