export function SectionLabel({
  index,
  children,
  className = "",
}: {
  index: string;
  children: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[11px] tracking-[0.28em] text-mint/80">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-mint/60 to-transparent" />
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
        {children}
      </span>
    </div>
  );
}
