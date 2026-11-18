import { projects, type Project } from "../data/projects";
import { ProjectPreview } from "./Previews";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const accentMap = {
  mint: {
    glow: "radial-gradient(60% 60% at 30% 0%, rgba(52,211,153,0.16), transparent 70%)",
    hoverBorder: "hover:border-mint/25",
    dot: "bg-mint",
    text: "text-mint/80",
    tag: "group-hover:border-mint/25 group-hover:text-mint/70",
  },
  aqua: {
    glow: "radial-gradient(60% 60% at 70% 0%, rgba(34,211,238,0.16), transparent 70%)",
    hoverBorder: "hover:border-aqua/25",
    dot: "bg-aqua",
    text: "text-aqua/80",
    tag: "group-hover:border-aqua/25 group-hover:text-aqua/70",
  },
  violet: {
    glow: "radial-gradient(60% 60% at 40% 0%, rgba(167,139,250,0.16), transparent 70%)",
    hoverBorder: "hover:border-violet-400/25",
    dot: "bg-violet-400",
    text: "text-violet-300/80",
    tag: "group-hover:border-violet-400/25 group-hover:text-violet-300/70",
  },
} as const;

function ProjectCard({ project, wide, className }: { project: Project; wide?: boolean; className?: string }) {
  const a = accentMap[project.accent];

  return (
    <article
      className={`group relative flex overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080b10] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-60px_rgba(52,211,153,0.45)] ${a.hoverBorder} ${
        wide ? "flex-col lg:flex-row" : "flex-col"
      } ${className ?? ""}`}
    >
      <div
        className={`relative overflow-hidden border-b border-white/[0.06] bg-[#060910] p-4 ${
          wide ? "lg:w-[54%] lg:border-b-0 lg:border-r" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: a.glow }}
        />
        <div className="relative h-[210px] transition-transform duration-700 ease-out group-hover:scale-[1.015] lg:h-full lg:min-h-[240px]">
          <ProjectPreview kind={project.preview} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 md:p-7 ${wide ? "lg:justify-center" : ""}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[24px] font-medium leading-none tracking-[-0.025em] text-white md:text-[26px]">
            {project.name}
          </h3>
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/25">{project.year}</span>
        </div>

        <p className={`mt-2.5 text-[13.5px] ${a.text}`}>{project.kind}</p>

        <p className="mt-3 text-[15px] leading-snug text-white/80">{project.tagline}</p>
        <p className="mt-2.5 max-w-[52ch] text-[13px] leading-[1.75] text-white/45">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className={`rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.06em] text-white/40 transition-colors duration-500 ${a.tag}`}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
            {project.concept ? (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                concept build
              </>
            ) : (
              <>
                <span className={`h-1 w-1 rounded-full ${a.dot}`} />
                shipped
              </>
            )}
          </span>

          {project.links?.[0] && (
            <a
              href={project.links[0].href}
              className="inline-flex items-center gap-1.5 text-[12px] text-white/50 transition-colors duration-300 hover:text-white"
            >
              {project.links[0].label}
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1340px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel index="02">Other builds</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                Products, tools and experiments<span className="text-mint">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[36ch] text-[13.5px] leading-[1.75] text-white/40">
              A selection of interfaces and systems built end to end — design, data model, deploy
              pipeline and the details that make them feel alive.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ProjectCard project={projects[0]} className="h-full" />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <ProjectCard project={projects[1]} className="h-full" />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-12">
            <ProjectCard project={projects[2]} wide />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
