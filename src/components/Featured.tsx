import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { featured } from "../data/projects";
import { SectionLabel } from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";
import { useVisibleOnce } from "../lib/useVisibleOnce";

type Line = { text: string; cls: string; prompt?: boolean };

const script: Line[] = [
  { text: "runledger receipt --open", cls: "text-white/90", prompt: true },
  { text: "session  a41f9c2e · claude-code · 12 steps", cls: "text-white/40" },
  { text: "files    7 changed   +318 −96", cls: "text-white/65" },
  { text: "models   claude-sonnet-4 → claude-opus-4", cls: "text-white/65" },
  { text: "cost     $0.42  ·  184k tokens", cls: "text-white/65" },
  { text: "risk     23 / 100  ·  no blockers", cls: "text-mint" },
  { text: "✓ wrote runledger-a41f9c2e.html", cls: "text-mint/75" },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useVisibleOnce(ref, { threshold: 0.95, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  const texts = useMemo(() => script.map((s) => s.text), []);

  useEffect(() => {
    if (reduce) {
      setLine(script.length);
      return;
    }
    if (!inView || line >= script.length) return;

    const current = texts[line];
    if (chars < current.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 13);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, 110);
    return () => clearTimeout(t);
  }, [inView, line, chars, texts, reduce]);

  const done = line >= script.length;

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[42px] bg-[radial-gradient(55%_55%_at_45%_25%,rgba(52,211,153,0.13),transparent_72%)] blur-2xl" />

      <TiltCard max={3.5} className="rounded-3xl">
        <div className="flex flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-[#06090d]/95 shadow-[0_40px_120px_-50px_rgba(16,185,129,0.35)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.015] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              <span className="ml-2.5 font-mono text-[10px] tracking-[0.08em] text-white/30">
                runledger — receipt
              </span>
            </div>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/20">
              zsh
            </span>
          </div>

          <div className="px-4 py-4 font-mono text-[11.5px] leading-[2.05] md:px-5 md:text-[12px]">
            {script.map((l, i) => {
              if (i > line) return null;
              const visible = i < line ? l.text : l.text.slice(0, chars);
              if (i === line && chars === 0 && !done) return null;
              return (
                <p key={i} className={`whitespace-pre ${l.cls}`}>
                  {l.prompt && <span className="mr-2 text-mint/70">$</span>}
                  {visible}
                  {i === line && !done && (
                    <span className="ml-[1px] inline-block h-[13px] w-[6px] translate-y-[2px] animate-caret bg-mint/80" />
                  )}
                </p>
              );
            })}
            {done && (
              <p className="mt-1 text-white/25">
                <span className="mr-2 text-mint/70">$</span>
                <span className="inline-block h-[13px] w-[6px] translate-y-[2px] animate-caret bg-mint/60" />
              </p>
            )}
          </div>

          <div
            className="border-t border-white/[0.06] px-4 py-3.5 transition-opacity duration-700 md:px-5"
            style={{ opacity: done ? 1 : 0 }}
            aria-hidden={!done}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
              12 steps · latest first
            </p>
            <ul className="mt-2.5 space-y-[6px] font-mono text-[10.5px] leading-tight">
              {[
                ["01", "read", "src/auth/session.ts", ""],
                ["02", "edit", "src/auth/session.ts", "+42 −8"],
                ["03", "run", "pytest -q", "✓ 118 passed"],
                ["04", "edit", "src/api/routes.py", "+18 −3"],
                ["05", "run", "npm test -- --coverage", "✓ 64 passed"],
                ["06", "edit", "src/lib/tokens.ts", "+9 −2"],
                ["07", "read", "docs/rollback.md", ""],
              ].map(([n, act, file, meta]) => (
                <li key={n} className="flex items-baseline gap-2.5">
                  <span className="text-white/20">{n}</span>
                  <span className="w-[26px] text-mint/60">{act}</span>
                  <span className="truncate text-white/45">{file}</span>
                  <span className="ml-auto whitespace-nowrap text-white/30">{meta}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 border-t border-white/[0.07] bg-white/[0.015] px-4 py-2.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/25">
              risk
            </span>
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-mint to-aqua transition-[width] duration-1000 ease-out"
                style={{ width: done ? "23%" : "4%" }}
              />
            </div>
            <span className="font-mono text-[9.5px] tracking-[0.1em] text-mint/80">
              {done ? "23 / 100" : "···"}
            </span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

export function Featured() {
  return (
    <section id="work" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1340px] px-6 md:px-10">
        <Reveal>
          <SectionLabel index="01">Featured project</SectionLabel>
        </Reveal>

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-[clamp(2.3rem,5.4vw,4.1rem)] font-medium leading-none tracking-[-0.035em] text-white">
                  {featured.name}
                </h2>
                <span className="rounded-full border border-mint/25 bg-mint/[0.06] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-mint/85">
                  {featured.version}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-white/40">
                  open source
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[46ch] font-display text-[17px] leading-snug tracking-[-0.01em] text-white/70 md:text-[19px]">
                {featured.tagline}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="flex flex-wrap items-center gap-2.5">
            {featured.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-all duration-300 ${
                  i === 0
                    ? "bg-[#e9eef3] font-medium text-[#060a0e] hover:bg-white"
                    : "border border-white/12 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className={i === 0 ? "" : "font-mono text-[12px]"}>{l.label}</span>
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <Reveal delay={0.06} className="order-2 lg:order-1 lg:flex lg:h-full lg:items-center">
            <Terminal />
          </Reveal>

          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <Reveal delay={0.04}>
              <p className="text-[14.5px] leading-[1.8] text-white/55 md:text-[15px]">
                {featured.description}
              </p>
            </Reveal>

            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              {featured.features.map((f, i) => (
                <Reveal key={f.title} delay={0.06 + i * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-all duration-500 hover:border-mint/25 hover:bg-white/[0.03]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14px] font-medium tracking-[-0.01em] text-white/90">
                        {f.title}
                      </h3>
                      <span className="mt-0.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-mint/50 transition-colors duration-500 group-hover:text-mint/90">
                        {f.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-[12.5px] leading-[1.7] text-white/45">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <div className="mt-1 flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-white/40"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
