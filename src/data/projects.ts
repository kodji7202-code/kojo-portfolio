/**
 * Site content and links.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS
 *  The three entries with `concept: true` are MOCKUPS: believable product cards
 *  that stand in for work in progress. To replace one with a real project,
 *  change the fields below and set `concept: false` (the "Concept" tag then
 *  disappears). No other file needs editing — the card grid, previews, tags and
 *  links all read from this list.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type PreviewKind = "workflow" | "chart" | "deploy";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  stack: string[];
  kind: string;
  preview: PreviewKind;
  /** true = placeholder card, shows a discreet "Concept" tag */
  concept: boolean;
  links?: { label: string; href: string }[];
  /** accent tint for the card glow */
  accent: "mint" | "aqua" | "violet";
};

export const profile = {
  name: "Kojo",
  role: "Developer · builder",
  email: "kodji7202@gmail.com",
  github: "https://github.com/kodji7202-code",
  githubLabel: "github.com/kodji7202-code",
  x: "https://x.com/MarkTwainBnrq",
  xLabel: "@MarkTwainBnrq",
  location: "Romania · working remote",
  availability: "Open to projects",
} as const;

export const featured = {
  name: "RunLedger",
  version: "v0.7.0",
  tagline: "A black box recorder for AI coding agents.",
  description:
    "RunLedger reads the session logs of Claude Code, Codex CLI, Factory Droid and Aider and turns every run into a receipt: what changed, what ran, which model did each step, what it cost and what looked risky. A Claude Code hook can stop risky calls before they execute, and local Git checkpoints let you roll a run back.",
  stack: ["Python", "Zero runtime deps", "Git", "GitHub Actions", "Self-hostable"],
  features: [
    {
      title: "Receipts, not logs",
      body: "HTML, Markdown or JSON: files changed with line counts, every step in plain language, model, tokens and estimated cost per step, a risk score from 0 to 100 with the reason behind each finding. Known secret formats are masked.",
      tag: "runledger receipt",
    },
    {
      title: "Safe rollback",
      body: "Snapshot tracked and non-ignored untracked files without touching HEAD, the index or the stash. Preview a restore, confirm it, undo it with an automatic safety checkpoint.",
      tag: "runledger rollback",
    },
    {
      title: "A guard that says no",
      body: "A real-time guard for Claude Code, Factory Droid and the Codex CLI: deny, ask or allow each tool call, hold destructive MCP calls for approval, route \"ask\" decisions to a person on the team server.",
      tag: "runledger guard",
    },
    {
      title: "Fits a pipeline",
      body: "runledger receipt --fail-on 60 exits with code 2 when risk climbs, so a risky agent run fails CI the same way a failing test does. A team server collects receipts across the whole team.",
      tag: "CI gate",
    },
  ],
  links: [
    { label: "Repository", href: "https://github.com/kodji7202-code/runledger" },
    { label: "runledger.site", href: "https://runledger.site" },
  ],
  facts: [
    { value: "0.7.0", label: "latest release" },
    { value: "4", label: "agents supported" },
    { value: "0", label: "runtime dependencies" },
    { value: "100", label: "point risk scale" },
  ],
} as const;

export const projects: Project[] = [
  {
    id: "orbit",
    name: "Orbit",
    tagline: "A visual runtime for LLM workflows.",
    description:
      "Compose agent steps as nodes and run them with retries, caching and a per-run cost budget. Every execution keeps a trace you can open and read, so a prompt that broke on Tuesday can be replayed on Thursday.",
    year: "2026",
    stack: ["TypeScript", "React Flow", "Postgres", "Redis"],
    kind: "AI workflow engine",
    preview: "workflow",
    concept: true,
    accent: "mint",
    links: [{ label: "Case study", href: "#contact" }],
  },
  {
    id: "tinylake",
    name: "Tinylake",
    tagline: "Privacy-first product analytics.",
    description:
      "A cookieless analytics layer that turns raw events into readable funnels. No consent banner, no personal data leaving your own database — just the twelve numbers a product team actually checks.",
    year: "2025",
    stack: ["TypeScript", "ClickHouse", "Node.js", "Tailwind"],
    kind: "Analytics platform",
    preview: "chart",
    concept: true,
    accent: "aqua",
    links: [{ label: "Case study", href: "#contact" }],
  },
  {
    id: "forge",
    name: "Forge",
    tagline: "A preview environment for every pull request.",
    description:
      "Spin up an isolated, seeded environment per branch in seconds and tear it down on merge. Docker detection is automatic, so the first environment usually works before the config file exists.",
    year: "2025",
    stack: ["Node.js", "Docker", "Postgres", "GitHub Actions"],
    kind: "Developer tooling",
    preview: "deploy",
    concept: true,
    accent: "violet",
    links: [{ label: "Case study", href: "#contact" }],
  },
];

export const approach = [
  {
    n: "01",
    title: "Evidence over vibes",
    body: "If a tool can't show you the receipt, it is asking for faith. I build the receipt first: what ran, what changed, what it cost, what looked wrong.",
  },
  {
    n: "02",
    title: "Local first",
    body: "Your files, your machine, your database. The network is a feature you switch on deliberately, not the place your work quietly lives.",
  },
  {
    n: "03",
    title: "Few dependencies, on purpose",
    body: "The Python standard library and no runtime dependencies, because every dependency is a future emergency at three in the morning.",
  },
  {
    n: "04",
    title: "The interface is engineering",
    body: "A tool nobody can read is a tool nobody uses. Typography, motion and the shape of a screen are part of whether the thing works.",
  },
] as const;

export const toolbox = [
  "Python",
  "TypeScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "WebGL",
  "SQLite",
  "Docker",
  "GitHub Actions",
  "Cloudflare",
  "Figma",
];
