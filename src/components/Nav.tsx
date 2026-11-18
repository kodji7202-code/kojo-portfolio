import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/projects";

const links = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/55"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1340px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="group flex items-center gap-2" aria-label="Kojo — back to top">
            <span className="font-display text-[19px] font-semibold leading-none tracking-[-0.03em] text-white">
              kojo
            </span>
            <span className="mb-[9px] h-[5px] w-[5px] rounded-full bg-mint shadow-[0_0_12px_2px_rgba(52,211,153,0.55)] transition-transform duration-500 group-hover:scale-125" />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[13.5px] text-white/60 transition-colors duration-300 hover:bg-white/[0.04] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-[7px] font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-70 [animation:pulse-ring_2.6s_ease-out_infinite]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              {profile.availability}
            </span>

            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-[#e9eef3] px-4 py-[9px] text-[13px] font-medium text-[#060a0e] transition-all duration-300 hover:gap-2.5 hover:bg-white sm:inline-flex"
            >
              Get in touch
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-white transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-white transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-[9px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pt-[104px] backdrop-blur-xl md:hidden"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.32 }}
          >
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-white/[0.07] py-5 font-display text-[28px] tracking-[-0.02em] text-white/90"
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                >
                  {l.label}
                  <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="block font-mono text-[13px] text-mint"
                onClick={() => setOpen(false)}
              >
                {profile.email}
              </a>
              <div className="flex gap-4 font-mono text-[12px] text-white/50">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={profile.x} target="_blank" rel="noreferrer">
                  X ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
