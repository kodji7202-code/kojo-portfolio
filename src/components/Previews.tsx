import type { ReactNode } from "react";
import type { PreviewKind } from "../data/projects";

/* ── shared chrome ──────────────────────────────────────────────────────── */

function Frame({
  url,
  children,
  tone = "mint",
}: {
  url: string;
  children: ReactNode;
  tone?: "mint" | "aqua" | "violet";
}) {
  const dot =
    tone === "aqua" ? "bg-aqua" : tone === "violet" ? "bg-violet-400" : "bg-mint";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070a0f]/90">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot} opacity-70`} />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[9.5px] tracking-[0.03em] text-white/25">
          {url}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ── 1. workflow graph ──────────────────────────────────────────────────── */

const nodes = [
  { id: "trigger", x: 34, y: 34, w: 74, label: "trigger" },
  { id: "plan", x: 150, y: 26, w: 62, label: "plan" },
  { id: "tools", x: 288, y: 48, w: 64, label: "tools" },
  { id: "verify", x: 158, y: 118, w: 66, label: "verify" },
  { id: "report", x: 292, y: 140, w: 70, label: "report" },
];

const edges = [
  { d: "M108 47 C126 47 132 42 150 39", active: true },
  { d: "M212 39 C246 42 258 46 288 55", active: true },
  { d: "M191 60 C191 84 191 96 191 118", active: false },
  { d: "M224 130 C256 128 268 140 292 152", active: false },
  { d: "M320 78 C320 100 320 118 320 140", active: true },
];

function WorkflowPreview() {
  return (
    <Frame url="orbit.app/flows/refund-triage" tone="mint">
      <div className="absolute inset-0 dotgrid opacity-40" />
      <svg viewBox="0 0 400 200" className="relative h-full w-full" role="img" aria-label="Workflow graph preview">
        <defs>
          <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {edges.map((e, i) => (
          <g key={i}>
            <path d={e.d} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <path
              d={e.d}
              fill="none"
              stroke={e.active ? "url(#edgeGlow)" : "rgba(255,255,255,0.22)"}
              strokeWidth="1.4"
              strokeDasharray="3 7"
              className="animate-dash"
              style={{ animationDuration: `${9 + i * 2}s` }}
            />
          </g>
        ))}

        {nodes.map((n, i) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height="28"
              rx="8"
              fill="rgba(10,15,21,0.96)"
              stroke={n.id === "verify" ? "rgba(52,211,153,0.55)" : "rgba(255,255,255,0.13)"}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + 18}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fill={n.id === "verify" ? "#6ee7b7" : "rgba(255,255,255,0.62)"}
            >
              {n.label}
            </text>
            {n.id === "verify" && (
              <circle cx={n.x + n.w - 4} cy={n.y + 4} r="2.4" fill="#34d399">
                <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            {i === 0 && (
              <circle cx={n.x + n.w - 4} cy={n.y + 4} r="2.4" fill="#22d3ee">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        <g fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="rgba(255,255,255,0.30)">
          <text x="34" y="188">run #482 · 1.4s</text>
          <text x="286" y="188" fill="rgba(52,211,153,0.65)">$0.0031 / run</text>
        </g>
      </svg>
    </Frame>
  );
}

/* ── 2. analytics chart ─────────────────────────────────────────────────── */

function ChartPreview() {
  const bars = [22, 34, 28, 46, 38, 58, 52, 68, 60, 76, 71, 88];
  return (
    <Frame url="tinylake.app/overview" tone="aqua">
      <div className="flex h-full flex-col p-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/30">unique visitors</p>
            <p className="mt-1 font-display text-[22px] leading-none text-white/90">
              12,480
              <span className="ml-2 font-mono text-[9px] text-mint">+18.4%</span>
            </p>
          </div>
          <div className="flex gap-1">
            {["7d", "30d", "90d"].map((t, i) => (
              <span
                key={t}
                className={`rounded px-1.5 py-0.5 font-mono text-[8px] ${
                  i === 1 ? "bg-white/10 text-white/70" : "text-white/25"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-3 flex-1">
          <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="h-full w-full" role="img" aria-label="Analytics chart preview">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22d3ee" stopOpacity="0.30" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" y1={12 + i * 28} x2="300" y2={12 + i * 28} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            <path
              d="M0 86 C26 80 34 62 56 64 C78 66 84 44 108 42 C132 40 140 54 164 50 C188 46 196 26 220 24 C244 22 258 34 300 18"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{
                strokeDasharray: 620,
                strokeDashoffset: 620,
                animation: "draw-line 2.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
              }}
            />
            <path
              d="M0 86 C26 80 34 62 56 64 C78 66 84 44 108 42 C132 40 140 54 164 50 C188 46 196 26 220 24 C244 22 258 34 300 18 L300 110 L0 110 Z"
              fill="url(#area)"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="mt-2 flex items-end gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[2px] bg-gradient-to-t from-aqua/25 to-mint/35"
              style={{
                height: `${h * 0.22}px`,
                transformOrigin: "bottom",
                animation: `grow-bar 700ms cubic-bezier(0.16,1,0.3,1) ${i * 45 + 200}ms both`,
              }}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[8px] tracking-[0.1em] text-white/25">
          no cookies · no pii · first-party only
        </p>
      </div>
    </Frame>
  );
}

/* ── 3. deploy log ──────────────────────────────────────────────────────── */

const logLines = [
  { t: "▸ forge deploy --pr 482", c: "text-white/85", d: 0 },
  { t: "  detected: node 22 · pnpm · postgres", c: "text-white/40", d: 260 },
  { t: "  build    finished in 11.4s", c: "text-white/40", d: 520 },
  { t: "  database seeded from prod-snapshot", c: "text-white/40", d: 780 },
  { t: "  routes   18 compiled · 0 warnings", c: "text-white/40", d: 1000 },
  { t: "  health   /api/health 200 · 38ms", c: "text-white/40", d: 1180 },
  { t: "✓ https://pr-482.forge.app", c: "text-mint", d: 1420 },
];

function DeployPreview() {
  return (
    <Frame url="forge.app/pr-482" tone="violet">
      <div className="flex h-full flex-col justify-between p-3.5">
        <div className="space-y-[7px] font-mono text-[9.5px] leading-none">
          {logLines.map((l) => (
            <p
              key={l.t}
              className={`whitespace-nowrap ${l.c}`}
              style={{ animation: `rise 500ms cubic-bezier(0.16,1,0.3,1) ${l.d}ms both` }}
            >
              {l.t}
            </p>
          ))}
        </div>

        <div>
          <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-violet-400 to-aqua"
              style={{ animation: "grow-width 2.2s cubic-bezier(0.16,1,0.3,1) 0.15s both", width: "86%" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[8px] tracking-[0.12em] text-white/25">
            <span>env · preview · ephemeral</span>
            <span>ttl 7d</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ProjectPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "workflow") return <WorkflowPreview />;
  if (kind === "chart") return <ChartPreview />;
  return <DeployPreview />;
}
