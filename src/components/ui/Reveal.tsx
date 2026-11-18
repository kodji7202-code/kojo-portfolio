import { useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useVisibleOnce } from "../../lib/useVisibleOnce";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Scroll-in reveal. Collapses to a plain div when the visitor prefers reduced motion. */
export function Reveal({ children, className, delay = 0, y = 20, duration = 0.85 }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisibleOnce(ref);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/** Line-by-line mask reveal, used for display headlines. */
export function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useVisibleOnce(ref);

  if (reduce) return <span className={`block ${className ?? ""}`}>{children}</span>;

  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`}>
      <span
        className="block will-change-transform"
        style={{
          transform: visible ? "translate3d(0,0,0)" : "translate3d(0, 110%, 0)",
          transition: `transform 1.05s ${EASE} ${delay}s`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
