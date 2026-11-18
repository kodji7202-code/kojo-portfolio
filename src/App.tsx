import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorGlow } from "./components/CursorGlow";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Featured } from "./components/Featured";
import { Projects } from "./components/Projects";
import { Approach } from "./components/Approach";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CursorGlow />
      <Nav />

      <main className="relative">
        <Hero />
        <Marquee />
        <Featured />
        <Projects />
        <Approach />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
