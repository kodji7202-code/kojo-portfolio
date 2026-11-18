import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element has entered the viewport.
 *
 * Uses IntersectionObserver, but also checks the element's position on mount:
 * IntersectionObserver's first callback can be missed for content that is on
 * screen at load, which left above-the-fold headlines stuck at their initial
 * offset.
 */
export function useVisibleOnce(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.92, margin = "0px 0px -8% 0px" }: { threshold?: number; margin?: string } = {},
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * threshold && rect.bottom > -vh * 0.1) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, margin]);

  return visible;
}
