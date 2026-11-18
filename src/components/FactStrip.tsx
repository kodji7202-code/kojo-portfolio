import { featured } from "../data/projects";

const facts = [
  { value: featured.version, label: "latest release" },
  { value: "4", label: "coding agents supported" },
  { value: "0", label: "runtime dependencies" },
  { value: "100", label: "point risk scale" },
];

export function FactStrip() {
  return (
    <div className="relative grid grid-cols-2 border-t border-white/[0.07] md:grid-cols-4">
      {facts.map((f, i) => (
        <div
          key={f.label}
          className={`group flex items-baseline gap-3 py-5 md:py-6 ${
            i > 0 ? "md:border-l md:border-white/[0.07] md:pl-6" : ""
          } ${i % 2 === 1 ? "border-l border-white/[0.07] pl-4 md:pl-6" : "pr-4"} ${
            i < 2 ? "border-b border-white/[0.07] md:border-b-0" : ""
          }`}
        >
          <span className="font-display text-[22px] font-medium leading-none tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-mint md:text-[26px]">
            {f.value}
          </span>
          <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-white/35">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}
