import { toolbox } from "../data/projects";

export function Marquee() {
  const row = [...toolbox, ...toolbox];

  return (
    <section className="relative border-b border-white/[0.07] py-8 md:py-10">
      <div className="mx-auto mb-6 flex w-full max-w-[1340px] items-center gap-4 px-6 md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
          Toolbox
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">2026</span>
      </div>

      <div className="marquee-host relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-3 md:gap-4">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-3 md:gap-4">
              <span className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 font-mono text-[11px] tracking-[0.04em] text-white/55 transition-colors duration-300 hover:border-mint/30 hover:text-white md:text-[12px]">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-white/15" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
