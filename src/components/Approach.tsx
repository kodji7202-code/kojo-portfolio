import { approach } from "../data/projects";
import { Reveal, RevealLine } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Approach() {
  return (
    <section
      id="approach"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(52,211,153,0.10), transparent 65%), radial-gradient(50% 45% at 90% 100%, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1340px] px-6 md:px-10">
        <Reveal>
          <SectionLabel index="03">How I build</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[1.03] tracking-[-0.035em] text-white">
              <RevealLine delay={0.02}>Small surfaces.</RevealLine>
              <RevealLine delay={0.1}>
                <span className="text-gradient">Loud evidence.</span>
              </RevealLine>
            </h2>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[42ch] text-[14.5px] leading-[1.8] text-white/50">
                I care less about how clever a system is and more about whether you can see what it
                did. Four rules I keep coming back to.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["self-taught", "open source first", "ships weekly", "reads the diff"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-white/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {approach.map((item, i) => (
              <Reveal key={item.n} delay={0.06 + i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080b10]/80 p-5 transition-all duration-500 hover:border-white/15 hover:bg-[#0a0f15]">
                  <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-mint via-aqua to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
                      {item.n}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/15 transition-colors duration-500 group-hover:bg-mint/70" />
                  </div>
                  <h3 className="mt-6 font-display text-[17px] font-medium leading-tight tracking-[-0.015em] text-white/90">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-[1.75] text-white/45">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
