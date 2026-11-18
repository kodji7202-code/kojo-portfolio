import { useEffect, useState } from "react";
import { profile } from "../data/projects";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Bucharest",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-white/30">
      <span className="h-1 w-1 rounded-full bg-mint/60" />
      {time} local
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink">
      <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <a href="#top" className="group flex items-center gap-2">
            <span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-white/80 transition-colors group-hover:text-white">
              kojo
            </span>
            <span className="mb-[7px] h-[4px] w-[4px] rounded-full bg-mint/80" />
          </a>
          <span className="h-3 w-px bg-white/10" />
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/25">
            © {new Date().getFullYear()}
          </span>
        </div>

        <p className="font-mono text-[10px] tracking-[0.1em] text-white/25">
          Built with React · Vite · WebGL — and a lot of TypeScript
        </p>

        <div className="flex items-center gap-5">
          <Clock />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] tracking-[0.1em] text-white/30 transition-colors hover:text-white/70"
          >
            GitHub
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] tracking-[0.1em] text-white/30 transition-colors hover:text-white/70"
          >
            X
          </a>
          <a
            href="#top"
            className="group flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-white/30 transition-colors hover:text-white/70"
          >
            Top
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
