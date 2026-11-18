import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The ambient loop that sits under the hero: a real, locally generated video
 * (ffmpeg, no external host) so the page never depends on a remote player or a
 * fragile CDN link. Poster first paint, video fades in once it can play.
 */
export function AmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (reduce) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay may be blocked until first interaction; the poster stays */
      });
    };

    if (video.readyState >= 2) play();
    video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, [reduce]);

  const mask =
    "radial-gradient(62% 58% at 74% 24%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 78%)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-[0.5] [filter:saturate(104%)_contrast(101%)_brightness(0.86)]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        autoPlay={!reduce}
        loop
        muted
        playsInline
        preload="auto"
        poster="/media/ambient-poster.jpg"
        disablePictureInPicture
        tabIndex={-1}
      >
        <source src="/media/ambient.mp4" type="video/mp4" />
        <source src="/media/ambient.webm" type="video/webm" />
      </video>

      {/* grade the footage into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_75%_at_60%_0%,transparent_10%,rgba(5,7,10,0.5)_58%,#05070a_90%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
    </div>
  );
}
