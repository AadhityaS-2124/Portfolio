import React, { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';

/* ---------------------------------------------------------------------- */
/* DATA TYPES & DATA — sourced from resume                                */
/* ---------------------------------------------------------------------- */

export interface NavLink {
  id: string;
  label: string;
}

export interface SkillGroup {
  title: string;
  icon: string;
  blurb: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  icon: string;
  description: string;
  tags: string[];
  codeUrl: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface TimelineItemType {
  when: string;
  title: string;
  org: string;
  detail: string;
  icon: string;
  ongoing?: boolean;
}

export interface Achievement {
  icon: string;
  title: string;
  detail: string;
  note: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Links {
  linkedin: string;
  githubProfile: string;
  email: string;
  phone: string;
  phoneDisplay: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'web',
    blurb: 'Interfaces for the systems below',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML / CSS', 'Zustand', 'LocalForage', 'Capacitor'],
  },
  {
    title: 'Languages & Backend',
    icon: 'data_object',
    blurb: 'Core languages and data plumbing',
    items: ['Python', 'Java', 'SQL'],
  },
  {
    title: 'Data Science & ML',
    icon: 'psychology',
    blurb: 'Where most of the real work happens',
    items: [
      'Computer Vision', 'CNNs', 'TensorFlow / Keras', 'Generative AI (GPT-3/4)',
      'Multi-Agent Systems', 'Tesseract OCR', 'LLM Integration', 'Prompt Engineering',
    ],
  },
  {
    title: 'Tools & Cloud',
    icon: 'cloud',
    blurb: 'Daily drivers and infra',
    items: [
      'Git / GitHub', 'Jupyter Notebook', 'Power BI', 'VS Code', 'Expo Go',
      'Oracle Cloud Infrastructure', 'Cursor', 'Windsurf (Codeium)', 'Antigravity (Google)',
    ],
  },
];

const PROJECTS: Project[] = [
  {
    id: 'astraea',
    title: 'Studio Pro Astraea',
    subtitle: 'Desktop Video Editing Suite',
    period: 'Personal Project',
    icon: 'movie',
    description:
      'A high-density desktop video editing suite built with Electron, React, and TypeScript. Features a multi-track timeline, integrated media pool, contextual inspector, and local clip clipboard actions, with FFmpeg integration for local encoding and proxy generation.',
    tags: ['Electron', 'React', 'TypeScript', 'Konva', 'FFmpeg', 'Zustand'],
    codeUrl: 'https://github.com/AadhityaS-2124/STUDIO-PRO-ASTRAEA',
    featured: true,
  },
  {
    id: 'engagement',
    title: 'Student Engagement Detector',
    subtitle: 'Real-Time CNN Engagement Classifier',
    period: 'Published — TIJER Vol. 11, Jul 2024',
    icon: 'visibility',
    description:
      'A CNN trained on facial expression and posture data classifies student engagement live from a webcam feed, pairing a React dashboard with a Python inference backend. Hit 93.5% validation accuracy.',
    tags: ['Python', 'TensorFlow / Keras', 'React', 'Computer Vision'],
    codeUrl: 'https://github.com/AadhityaS-2124/Student-Engagement-Detection-System',
    featured: true,
  },
  {
    id: 'translator',
    title: 'Multi-Language Image Translator',
    subtitle: 'OCR-to-Speech Translation Pipeline',
    period: 'Personal Project',
    icon: 'translate',
    description:
      'Extracts text from any image and translates it across 20+ languages in real time, with adaptive contrast normalization to sharpen OCR accuracy and a text-to-speech layer built for visually impaired users.',
    tags: ['Python', 'Tesseract OCR', 'GoogleTrans API', 'TTS'],
    codeUrl: 'https://github.com/AadhityaS-2124/Multi_Lingua_Snap',
  },
  {
    id: 'lazyvault',
    title: 'Lazy Vault',
    subtitle: 'Cross-Platform Encrypted Password Manager',
    period: 'Personal Project',
    icon: 'lock',
    description:
      'An offline-first password manager with locally encrypted storage and zero server-side data transmission — every credential stays on-device. Shipped as a PWA and to Android via Capacitor.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Capacitor'],
    codeUrl: 'https://github.com/AadhityaS-2124/Lazy-Vault-Password-Manager',
  },
  {
    id: 'laforet',
    title: 'La Forêt',
    subtitle: 'High-End Minimalist Japandi E-commerce',
    period: 'Personal Project',
    icon: 'shopping_bag',
    description:
      'A Japandi-inspired minimalist e-commerce storefront prototype built with React and TypeScript. Features a modular state architecture, custom animations, localized cart workflows, and interactive checkout simulations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'State Management'],
    codeUrl: 'https://github.com/AadhityaS-2124/La_Foret',
    demoUrl: 'https://la-foret.netlify.app/#/',
    featured: true,
  },
  {
    id: 'medagent',
    title: 'MedAgent',
    subtitle: 'Multi-Agent Clinical Decision Support System',
    period: 'Final Year Project',
    icon: 'smart_toy',
    description:
      'Coordinates specialized medical agents — symptom analysis, knowledge retrieval, diagnosis — into one LLM-backed pipeline that mirrors real clinical reasoning and outputs consolidated, structured recommendations.',
    tags: ['Python', 'Multi-Agent Systems', 'LLM', 'Medical AI'],
    codeUrl: 'https://github.com/aathifpm/medAgent',
    featured: true,
  },
];

const TIMELINE: TimelineItemType[] = [
  {
    when: 'Oct 2022 — May 2026',
    title: 'B.Tech, Artificial Intelligence & Data Science',
    org: 'Panimalar Engineering College',
    detail: 'CGPA 7.31 / 10. Final-year project: MedAgent, a multi-agent clinical decision support system.',
    icon: 'school',
    ongoing: true,
  },
  {
    when: 'Dec 2023 — Jan 2024',
    title: 'Data Science Intern',
    org: 'Teachnook',
    detail:
      'Built reusable EDA pipelines, applied supervised ML to structured datasets, and presented findings to senior data scientists.',
    icon: 'work',
  },
  {
    when: 'Jul 2024',
    title: 'Peer-Reviewed Publication',
    org: 'TIJER — International Journal of Engineering Research, Vol. 11',
    detail: '"Student Engagement Detection Using CNN" — Ref. TIJERC001332.',
    icon: 'description',
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: 'military_tech',
    title: 'IEEEXtreme 17.0',
    detail: 'Global Rank 845 · India Rank 543',
    note: 'Team datadreamweavers — 24hr international programming competition',
  },
  {
    icon: 'military_tech',
    title: 'IEEEXtreme 18.0',
    detail: 'Global Rank 2,744 · India Rank 1,499',
    note: 'Team HELLOHI — 24hr global programming challenge',
  },
  {
    icon: 'campaign',
    title: 'Conference Presenter',
    detail: 'Applied CV & ML research',
    note: 'Presented findings at international technical conferences',
  },
  {
    icon: 'groups',
    title: 'Project Lead',
    detail: 'Team of 4 engineers',
    note: 'Directed delivery, task split, and version control via GitHub',
  },
];

const CERTIFICATIONS: string[] = [
  'Oracle — Cloud Infrastructure AI Foundations',
  'Oracle — Data Platform Foundations',
  'Oracle — Cloud Infrastructure Foundations',
  'Infosys — AI-First Software Engineering',
  'Infosys — Prompt Engineering',
  'Infosys — OpenAI GPT-3/4 for Developers',
  'NASSCOM — Data Science for Beginners',
];

const STATS: Stat[] = [
  { value: '93.5%', label: 'CNN validation accuracy' },
  { value: '#845', label: 'IEEEXtreme 17.0 global rank' },
  { value: '1', label: 'peer-reviewed publication' },
  { value: '6', label: 'shipped AI / dev projects' },
];

const LINKS: Links = {
  linkedin: 'https://www.linkedin.com/in/aadhityaspec',
  githubProfile: 'https://github.com/AadhityaS-2124',
  email: 'aadhitya2124@gmail.com',
  phone: '+919080748288',
  phoneDisplay: '+91 90807 48288',
};

/* ---------------------------------------------------------------------- */
/* Resume Request Form — email delivery                                   */
/* ---------------------------------------------------------------------- */

const EMAILJS_SERVICE_ID: string = 'service_k0d8maq';
const EMAILJS_TEMPLATE_ID: string = 'template_pv78k2k';
const EMAILJS_PUBLIC_KEY: string = 'kVXQ20yrIQ960C2A2';

export interface EmailParams {
  name: string;
  company: string;
  email: string;
  message?: string;
}

export type EmailResponse = Response | { demo: boolean };

async function sendResumeRequestEmail({
  name,
  company,
  email,
  message,
}: EmailParams): Promise<EmailResponse> {
  const templateParams = {
    from_name: name,
    company,
    reply_to: email,
    user_email: email,
    message: message || 'No message provided.',
  };

  const isConfigured =
    !!EMAILJS_SERVICE_ID &&
    !!EMAILJS_TEMPLATE_ID &&
    !!EMAILJS_PUBLIC_KEY &&
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  if (!isConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 950));
    return { demo: true };
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `EmailJS request failed with status ${response.status}`);
  }
  return response;
}

/* ---------------------------------------------------------------------- */
/* GLOBAL STYLES — "Auralis" premium tonal design system                  */
/* ---------------------------------------------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

      html, body { scroll-behavior: smooth; }

      .pf-root {
        --bg: #F7F7F5;
        --ink: #111111;
        --ink-soft: #6B6B6B;
        --panel: #F3F2EF;
        --card: #FCFCFB;
        --border: #E7E7E4;
        --surface-variant: #E5E2E1;
        --primary: #000000;
        --on-primary: #FFFFFF;
        --emerald: #10B981;
        --emerald-deep: #059669;

        background-color: var(--bg);
        background-image: radial-gradient(rgba(17, 17, 17, 0.05) 1.5px, transparent 1.5px);
        background-size: 24px 24px;
        color: var(--ink);
        font-family: 'Geist', 'Inter', sans-serif;
        position: relative;
      }

      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }

      .pf-font-mono { font-family: 'JetBrains Mono', monospace; }

      .pf-ink { color: var(--ink); }
      .pf-ink-soft { color: var(--ink-soft); }
      .pf-emerald { color: var(--emerald-deep); }

      .pf-h1 {
        font-weight: 700;
        letter-spacing: -0.05em;
        line-height: 1.0;
        font-size: clamp(3rem, 7vw, 6rem);
      }
      .pf-h2 {
        font-weight: 600;
        letter-spacing: -0.03em;
        line-height: 1.1;
        font-size: clamp(2.25rem, 4.5vw, 4rem);
      }
      .pf-h3 {
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.2;
        font-size: 1.75rem;
      }
      .pf-label-caps {
        font-weight: 600;
        letter-spacing: 0.12em;
        font-size: 10px;
        line-height: 1;
        text-transform: uppercase;
      }
      .pf-body-lg {
        font-size: 19px;
        line-height: 1.6;
        letter-spacing: -0.02em;
      }

      /* ---- Surfaces ---- */
      .pf-card {
        background-color: var(--card);
        border: 1px solid var(--border);
        transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pf-card-int:hover {
        box-shadow: 0 16px 36px rgba(17, 17, 17, 0.08);
        transform: translateY(-4px);
      }
      .pf-panel {
        background-color: var(--panel);
        border: 1px solid var(--border);
      }

      /* ---- Buttons ---- */
      .pf-btn-primary {
        background-color: var(--primary);
        color: var(--on-primary);
        font-weight: 600;
        transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }
      .pf-btn-primary:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .pf-btn-primary:active { transform: scale(0.98); opacity: 0.9; }
      .pf-btn-primary:disabled { cursor: not-allowed; opacity: 0.65; }

      .pf-btn-secondary {
        background-color: transparent;
        border: 1px solid var(--ink);
        color: var(--ink);
        font-weight: 600;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .pf-btn-secondary:hover { background-color: var(--surface-variant); transform: translateY(-1px); }
      .pf-btn-secondary:active { transform: scale(0.98); }

      .pf-btn-ghost {
        background-color: var(--panel);
        border: 1px solid var(--border);
        color: var(--ink);
        font-weight: 600;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .pf-btn-ghost:hover { background-color: var(--surface-variant); transform: translateY(-1px); }
      .pf-btn-ghost:active { transform: scale(0.98); }

      .pf-pressed {
        transform: scale(0.97) !important;
        opacity: 0.8 !important;
      }

      /* ---- Pills & tags ---- */
      .pf-pill {
        background-color: var(--surface-variant);
        color: var(--ink);
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 0.04em;
        border-radius: 6px;
        padding: 4px 10px;
        border: 1px solid var(--border);
      }
      .pf-tag {
        background-color: var(--panel);
        border: 1px solid var(--border);
        color: var(--ink-soft);
        font-size: 11px;
        font-family: 'JetBrains Mono', monospace;
        border-radius: 4px;
        padding: 3px 8px;
        white-space: nowrap;
      }

      .pf-icon-chip {
        background-color: var(--panel);
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* ---- Inputs ---- */
      .pf-input-wrapper {
        position: relative;
        background-color: var(--card);
        border: 1px solid var(--border);
        border-radius: 8px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .pf-input-wrapper:focus-within {
        border-color: var(--ink);
        box-shadow: 0 0 0 3px rgba(17, 17, 17, 0.05);
      }
      
      .pf-input-label {
        position: absolute;
        top: -7px;
        left: 10px;
        background-color: var(--card);
        padding: 0 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        font-weight: 600;
        color: var(--ink-soft);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .pf-input {
        background: transparent;
        border: none;
        color: var(--ink);
        width: 100%;
        font-size: 14px;
        padding: 12px 14px;
        box-sizing: border-box;
      }
      .pf-input:focus {
        outline: none;
      }
      .pf-input:disabled { opacity: 0.6; cursor: not-allowed; }

      .pf-root *:focus-visible {
        outline: 2px solid var(--ink);
        outline-offset: 3px;
        border-radius: 6px;
      }

      .pf-status-dot {
        width: 8px; height: 8px; border-radius: 999px;
        background-color: var(--emerald);
      }
      .pf-status-dot-pulse { animation: pf-pulse 2s ease-in-out infinite; }

      .pf-orb {
        position: absolute;
        border-radius: 999px;
        filter: blur(80px);
        pointer-events: none;
        opacity: 0.45;
      }

      @keyframes pf-fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .pf-fade-up { animation: pf-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

      @keyframes pf-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.45; }
      }

      @keyframes pf-node-pulse {
        0%, 100% { transform: scale(0.9); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      .pf-node-pulse { animation: pf-node-pulse 2.6s ease-in-out infinite; transform-origin: center; }

      @keyframes pf-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
      .pf-cursor { animation: pf-blink 1s step-end infinite; }

      @keyframes pf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .pf-spin { display: inline-block; animation: pf-spin 0.9s linear infinite; }

      @keyframes pf-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .pf-modal-backdrop {
        background-color: rgba(17, 17, 17, 0.35);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        animation: pf-fade-in 0.25s ease both;
      }

      @keyframes pf-modal-in {
        from { opacity: 0; transform: translateY(24px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .pf-modal-panel { animation: pf-modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }

      @keyframes pf-toast-in {
        from { opacity: 0; transform: translateY(16px) translateX(-50%); }
        to { opacity: 1; transform: translateY(0) translateX(-50%); }
      }
      .pf-toast { animation: pf-toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }

      /* ---- Marquee Animation ---- */
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .pf-marquee-inner {
        display: flex;
        width: max-content;
        animation: marquee 35s linear infinite;
      }
      .pf-marquee-inner:hover {
        animation-play-state: paused;
      }

      @media (prefers-reduced-motion: reduce) {
        .pf-fade-up, .pf-node-pulse, .pf-cursor, .pf-toast, .pf-spin, .pf-modal-panel, .pf-modal-backdrop, .pf-status-dot-pulse, .pf-marquee-inner { animation: none !important; }
        .pf-card-int:hover, .pf-btn-primary:hover, .pf-btn-secondary:hover, .pf-btn-ghost:hover { transform: none !important; }
      }
    `}</style>
  );
}

/* ---------------------------------------------------------------------- */
/* Material Symbols icon helper                                            */
/* ---------------------------------------------------------------------- */

interface MIconProps {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}

function MIcon({ name, size = 20, className = '', filled = false }: MIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* Hero signature visual — "agent pipeline" diagram (MedAgent motif)      */
/* ---------------------------------------------------------------------- */

interface PipelineNode {
  x: number;
  y: number;
  label: string;
  fill: string;
}

function AgentPipeline() {
  const nodes: PipelineNode[] = [
    { x: 80, y: 70, label: 'Symptom Agent', fill: '#FB7185' },
    { x: 320, y: 70, label: 'Knowledge Agent', fill: '#818CF8' },
    { x: 200, y: 240, label: 'Diagnosis Agent', fill: '#34D399' },
  ];
  const center = { x: 200, y: 150 };

  return (
    <div className="pf-card rounded-2xl p-6 relative bg-[#FCFCFB] shadow-sm select-none">
      <div className="absolute top-4 left-4 flex items-center gap-1.5 pf-font-mono text-[9px] pf-ink-soft">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        ORCHESTRATOR_PIPELINE // MEDAGENT
      </div>
      <svg viewBox="0 0 400 300" className="w-full h-auto" role="img" aria-label="MedAgent pipeline map">
        {/* Connection Paths */}
        {nodes.map((n, i) => (
          <path
            key={`path-${i}`}
            id={`pf-path-${i}`}
            d={`M${center.x},${center.y} L${n.x},${n.y}`}
            stroke="rgba(17,17,17,0.08)"
            strokeWidth="3"
            strokeDasharray="4,4"
            fill="none"
          />
        ))}

        {/* Animated packet paths */}
        {nodes.map((_, i) => (
          <circle key={`pkt-${i}`} r="4.5" fill="#111111">
            <animateMotion dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#pf-path-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Center Node */}
        <circle cx={center.x} cy={center.y} r="26" fill="#F3F2EF" stroke="#111111" strokeWidth="2" />
        <text x={center.x} y={center.y + 6} textAnchor="middle" className="material-symbols-outlined pf-ink" fontSize="16">
          router
        </text>

        {/* Outer Nodes */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle cx={n.x} cy={n.y} r="22" fill={n.fill} opacity="0.12" />
            <circle cx={n.x} cy={n.y} r="8" fill={n.fill} className="pf-node-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
            
            {/* Label box */}
            <rect 
              x={n.x - 55} 
              y={n.y + (n.y > 150 ? 28 : -38)} 
              width="110" 
              height="18" 
              rx="4" 
              fill="#F3F2EF" 
              stroke="#E7E7E4" 
              strokeWidth="1"
            />
            <text
              x={n.x}
              y={n.y + (n.y > 150 ? 40 : -26)}
              textAnchor="middle"
              className="pf-font-mono"
              fill="#111111"
              fontSize="9"
              fontWeight="600"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Infinite Marquee Component                                            */
/* ---------------------------------------------------------------------- */

function CertificationsMarquee() {
  return (
    <div className="w-full overflow-hidden pf-panel border-y border-neutral-300 py-3 relative bg-[#FCFCFB] my-8 select-none">
      <div className="pf-marquee-inner flex gap-8 whitespace-nowrap">
        {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-1.5 pf-panel rounded-lg text-xs font-semibold pf-font-mono pf-ink">
            <MIcon name="workspace_premium" size={15} className="pf-emerald" />
            {cert}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Resume Request Modal                                                  */
/* ---------------------------------------------------------------------- */

interface ResumeRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

function ResumeRequestModal({ open, onClose, onSuccess }: ResumeRequestModalProps) {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) return;
    setError(null);
    setStatus('sending');
    try {
      await sendResumeRequestEmail(form);
      const sentTo = form.email;
      setForm({ name: '', company: '', email: '', message: '' });
      setStatus('idle');
      onSuccess(sentTo);
    } catch (err: any) {
      console.error('Resume request failed:', err);
      setStatus('idle');
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong — please try again, or email me directly.'
      );
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget && status !== 'sending') onClose();
  }

  return (
    <div className="pf-modal-backdrop fixed inset-0 z-[60] flex items-center justify-center p-6" onClick={handleBackdropClick}>
      <div className="pf-card pf-modal-panel rounded-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          disabled={status === 'sending'}
          aria-label="Close"
          className="pf-btn-ghost rounded-full w-9 h-9 flex items-center justify-center absolute top-5 right-5"
        >
          <MIcon name="close" size={18} />
        </button>

        <div className="pf-icon-chip w-12 h-12 rounded-xl mb-4">
          <MIcon name="download" size={20} className="pf-ink" />
        </div>
        <h3 className="pf-h3 pf-ink">Request My Resume</h3>
        <p className="pf-ink-soft text-sm mt-2 leading-relaxed">
          Fill out the metadata below and the pipeline will dispatch my CV package to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="pf-input-wrapper">
            <span className="pf-input-label">Full Name *</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="pf-input"
              required
              disabled={status === 'sending'}
            />
          </div>
          <div className="pf-input-wrapper">
            <span className="pf-input-label">Company / Organization *</span>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Inc."
              className="pf-input"
              required
              disabled={status === 'sending'}
            />
          </div>
          <div className="pf-input-wrapper">
            <span className="pf-input-label">Professional Email *</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@acme.com"
              className="pf-input"
              required
              disabled={status === 'sending'}
            />
          </div>
          <div className="pf-input-wrapper">
            <span className="pf-input-label">Message (optional)</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What are you hiring for?"
              rows={3}
              className="pf-input resize-none"
              disabled={status === 'sending'}
            />
          </div>

          {error && <p className="text-xs font-semibold" style={{ color: '#BA1A1A' }}>{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`pf-btn-primary rounded-lg w-full py-3.5 text-xs font-semibold uppercase tracking-wider pf-font-mono inline-flex items-center justify-center gap-2 ${status === 'sending' ? 'pf-pressed' : ''}`}
          >
            {status === 'sending' ? (
              <><MIcon name="progress_activity" size={16} className="pf-spin" /> Transmitting…</>
            ) : (
              <><MIcon name="send" size={16} /> Send Request</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Nav                                                                   */
/* ---------------------------------------------------------------------- */

interface NavBarProps {
  onOpenResumeModal: () => void;
}

function NavBar({ onOpenResumeModal }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#F7F7F5]/80 backdrop-blur-md border-b border-[#E7E7E4] shadow-sm py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight pf-ink pf-font-mono" style={{ letterSpacing: '-0.04em' }}>
          aadhitya<span className="pf-ink-soft">.console</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-xs font-semibold uppercase tracking-widest pf-font-mono pf-ink-soft hover:text-[#111111] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenResumeModal}
            className="pf-btn-ghost rounded-lg text-xs font-semibold uppercase tracking-wider pf-font-mono px-4 py-2.5 inline-flex items-center gap-1.5"
          >
            <MIcon name="download" size={16} /> CV_PACKAGE
          </button>
          <a href="#contact" className="pf-btn-primary rounded-lg text-xs font-semibold uppercase tracking-wider pf-font-mono px-5 py-2.5 inline-flex items-center gap-1.5">
            ESTABLISH_TALK <MIcon name="arrow_forward" size={15} />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden pf-btn-ghost rounded-lg p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <MIcon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-8 py-5 flex flex-col gap-4 bg-[#F7F7F5] border-b border-[#E7E7E4]">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onOpenResumeModal(); setOpen(false); }}
            className="pf-btn-ghost rounded-lg text-xs font-semibold uppercase tracking-wider pf-font-mono py-3 inline-flex items-center justify-center gap-1.5"
          >
            <MIcon name="download" size={16} /> CV_PACKAGE
          </button>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="pf-btn-primary rounded-lg text-xs font-semibold uppercase tracking-wider pf-font-mono py-3 text-center"
          >
            ESTABLISH_TALK
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/* Hero                                                                   */
/* ---------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative px-8 max-w-7xl mx-auto pt-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7 pf-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 pf-panel rounded-lg text-xs font-semibold pf-font-mono pf-ink-soft mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            CONSOLE_ONLINE // AGENT_HOST
          </div>
          <h1 className="pf-h1 pf-ink tracking-tighter">Aadhitya S</h1>
          <p className="pf-font-mono text-sm pf-emerald mt-2 font-semibold uppercase tracking-wider">
            [AI / ML Engineer &amp; Full-Stack Developer]
          </p>
          <p className="pf-body-lg pf-ink-soft max-w-xl mt-6 leading-relaxed">
            I orchestrate specialized multi-agent AI systems, train real-time CNN posture/facial 
            classifiers, and design encrypted zero-trust PWAs. Bridging scientific AI research with robust software.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a href="#projects" className="pf-btn-primary rounded-lg px-6 py-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider pf-font-mono">
              Execute View Projects <MIcon name="arrow_forward" size={16} />
            </a>
            <a href="#contact" className="pf-btn-secondary rounded-lg px-6 py-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider pf-font-mono">
              Inquire Pipeline
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 max-w-xl">
            {STATS.map((s) => (
              <div key={s.label} className="pf-panel rounded-xl px-4 py-3 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
                <div className="pf-font-mono pf-ink text-xl font-bold">{s.value}</div>
                <div className="pf-ink-soft text-[10px] mt-1 font-semibold uppercase tracking-wider pf-font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 pf-fade-up" style={{ animationDelay: '0.15s' }}>
          <AgentPipeline />
        </div>
      </div>

      <CertificationsMarquee />
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Section heading helper                                                */
/* ---------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow: string;
}

function SectionHeading({ eyebrow }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-6 select-none">
      <span className="pf-pill pf-font-mono text-xs uppercase font-bold">{eyebrow}</span>
      <div className="h-px flex-grow" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  );
}

interface SectionIntroProps {
  title: string;
  description: string;
}

function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      <div className="lg:col-span-7">
        <h2 className="pf-h2 pf-ink">{title}</h2>
      </div>
      <div className="lg:col-span-5 flex items-end">
        <p className="pf-body-lg pf-ink-soft">{description}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Skills                                                                */
/* ---------------------------------------------------------------------- */

function SkillsSection() {
  return (
    <section id="skills" className="px-8 max-w-7xl mx-auto" style={{ marginBottom: '140px' }}>
      <SectionHeading eyebrow="Capabilities" />
      <SectionIntro
        title="Technical stack, segmented by utility"
        description="A structured registry of daily developer tools, languages, and frameworks parsed by deployment function."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="pf-card pf-card-int rounded-xl p-6 bg-[#FCFCFB]">
            <div className="pf-icon-chip w-11 h-11 rounded-lg mb-4">
              <MIcon name={group.icon} size={20} className="pf-ink" />
            </div>
            <h3 className="pf-ink font-bold pf-font-mono uppercase tracking-wider text-sm">{group.title}</h3>
            <p className="pf-ink-soft text-xs mt-1 mb-4 leading-relaxed">{group.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="pf-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Projects                                                              */
/* ---------------------------------------------------------------------- */

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="pf-card pf-card-int rounded-2xl p-7 flex flex-col justify-between bg-[#FCFCFB] shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="pf-icon-chip w-12 h-12 rounded-xl">
            <MIcon name={project.icon} size={22} className="pf-ink" />
          </div>
          {project.featured && <span className="pf-pill pf-font-mono text-[9px] uppercase font-bold shrink-0">Featured</span>}
        </div>

        <h3 className="pf-h3 pf-ink tracking-tight">{project.title}</h3>
        <p className="pf-ink-soft text-xs mt-1 font-semibold uppercase tracking-wider pf-font-mono">{project.subtitle}</p>
        <p className="pf-font-mono pf-ink-soft text-[10px] mt-2 block border-l-2 border-neutral-300 pl-2">{project.period}</p>
        <p className="text-sm leading-relaxed mt-4 pf-ink-soft">{project.description}</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((t) => (
            <span key={t} className="pf-tag">{t}</span>
          ))}
        </div>

        <div className="mt-6 pt-5 flex flex-wrap gap-3" style={{ borderTop: '1px solid var(--border)' }}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-btn-primary rounded-lg px-5 py-2.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider pf-font-mono"
            >
              <MIcon name="open_in_new" size={15} /> Live Demo
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-btn-secondary rounded-lg px-5 py-2.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider pf-font-mono"
          >
            <Github size={15} /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-8 max-w-7xl mx-auto" style={{ marginBottom: '140px' }}>
      <SectionHeading eyebrow="Systems Shipped" />
      <SectionIntro
        title="Production and research systems"
        description="A list of selected builds covering multi-agent platforms, real-time computer vision engines, and zero-trust mobile vaults."
      />
      <div className="grid sm:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Journey: timeline + achievements + certifications                      */
/* ---------------------------------------------------------------------- */

interface TimelineItemProps {
  item: TimelineItemType;
}

function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className="relative pb-10 last:pb-0" style={{ paddingLeft: '52px' }}>
      <div
        className="pf-card absolute top-0 rounded-full flex items-center justify-center bg-[#FCFCFB]"
        style={{ left: 0, width: '36px', height: '36px' }}
      >
        <MIcon name={item.icon} size={16} className="pf-ink" />
      </div>
      <p className="pf-font-mono pf-emerald text-xs font-bold uppercase tracking-wider">{item.when}</p>
      <h3 className="pf-ink font-bold mt-1 tracking-tight text-lg">
        {item.title}
        {item.ongoing && <span className="pf-pill pf-font-mono text-[9px] uppercase font-bold ml-2 align-middle">Active</span>}
      </h3>
      <p className="pf-ink-soft text-xs font-semibold uppercase tracking-wider pf-font-mono mt-0.5">{item.org}</p>
      <p className="text-sm mt-3 leading-relaxed max-w-xl pf-ink-soft">{item.detail}</p>
    </div>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="px-8 max-w-7xl mx-auto" style={{ marginBottom: '140px' }}>
      <SectionHeading eyebrow="Milestones" />
      <SectionIntro
        title="Development timeline &amp; events"
        description="Tracing B.Tech academic research, machine learning internships, and engineering publications."
      />

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="relative">
          <div className="absolute top-1 bottom-1" style={{ left: '17px', width: '1px', backgroundColor: 'var(--border)' }} />
          {TIMELINE.map((item) => (
            <TimelineItem key={item.title} item={item} />
          ))}
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="pf-label-caps pf-ink-soft mb-4">Programming Competitions &amp; Leads</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.title} className="pf-panel rounded-xl p-5 flex flex-col justify-between bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
                  <div>
                    <MIcon name={a.icon} size={20} className="pf-ink mb-3" />
                    <p className="text-sm font-bold pf-ink tracking-tight">{a.title}</p>
                    <p className="pf-ink-soft text-xs font-semibold uppercase tracking-wider pf-font-mono mt-1">{a.detail}</p>
                  </div>
                  <p className="pf-ink-soft text-xs mt-3 leading-relaxed">{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Contact                                                               */
/* ---------------------------------------------------------------------- */

interface ContactFormProps {
  onSendSuccess: (name: string) => void;
}

function ContactForm({ onSendSuccess }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setError(null);
    setStatus('sending');

    try {
      await sendResumeRequestEmail({
        name: form.name,
        company: 'Direct Contact Form',
        email: form.email,
        message: form.message,
      });
      setStatus('success');
      onSendSuccess(form.name);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('idle');
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to dispatch message. Please check connection or reach out via raw email.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="pf-card rounded-2xl p-8 text-center pf-fade-up bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
        <div className="pf-icon-chip w-12 h-12 rounded-xl mx-auto mb-4">
          <MIcon name="done" size={20} className="pf-emerald" />
        </div>
        <h3 className="pf-h3 pf-ink" style={{ fontSize: '20px' }}>Message Dispatched!</h3>
        <p className="pf-ink-soft text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          Your transmission went through securely. I will monitor my workspace inbox and get right back to you.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="pf-btn-secondary rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider pf-font-mono mt-6"
        >
          Reset Console Input
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pf-card rounded-2xl p-8 space-y-5 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
      <div className="pf-input-wrapper">
        <span className="pf-input-label">Name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="pf-input"
          required
          disabled={status === 'sending'}
        />
      </div>
      <div className="pf-input-wrapper">
        <span className="pf-input-label">Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="pf-input"
          required
          disabled={status === 'sending'}
        />
      </div>
      <div className="pf-input-wrapper">
        <span className="pf-input-label">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What are you building?"
          rows={4}
          className="pf-input resize-none"
          required
          disabled={status === 'sending'}
        />
      </div>

      {error && <p className="text-xs font-semibold" style={{ color: '#BA1A1A' }}>{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`pf-btn-primary rounded-lg w-full py-4 text-xs font-semibold uppercase tracking-wider pf-font-mono inline-flex items-center justify-center gap-2 ${
          status === 'sending' ? 'pf-pressed' : ''
        }`}
      >
        {status === 'sending' ? (
          <>
            <MIcon name="progress_activity" size={16} className="pf-spin" /> Transmitting…
          </>
        ) : (
          <>
            <MIcon name="send" size={16} /> Establish Connection
          </>
        )}
      </button>
    </form>
  );
}

interface ContactSectionProps {
  onContactSuccess: (name: string) => void;
}

function ContactSection({ onContactSuccess }: ContactSectionProps) {
  return (
    <section id="contact" className="px-8 max-w-7xl mx-auto" style={{ marginBottom: '140px' }}>
      <SectionHeading eyebrow="Establish Stream" />
      <SectionIntro
        title="Open to engineering &amp; research roles"
        description="Open to early AI engineering teams, research assistant pipelines, and applied deep learning pipelines."
      />
      <div className="grid lg:grid-cols-2 gap-10">
        <ContactForm onSendSuccess={onContactSuccess} />

        <div className="space-y-4">
          <a href={`mailto:${LINKS.email}`} className="pf-card pf-card-int rounded-xl p-5 flex items-center gap-4 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
            <div className="pf-icon-chip w-10 h-10 rounded-lg shrink-0">
              <MIcon name="mail" size={18} className="pf-ink" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft">Email</p>
              <p className="pf-ink font-semibold mt-0.5 text-sm">{LINKS.email}</p>
            </div>
          </a>

          <a href={`tel:${LINKS.phone}`} className="pf-card pf-card-int rounded-xl p-5 flex items-center gap-4 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
            <div className="pf-icon-chip w-10 h-10 rounded-lg shrink-0">
              <MIcon name="call" size={18} className="pf-ink" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft">Phone</p>
              <p className="pf-ink font-semibold mt-0.5 text-sm">{LINKS.phoneDisplay}</p>
            </div>
          </a>

          <a href={LINKS.githubProfile} target="_blank" rel="noopener noreferrer" className="pf-card pf-card-int rounded-xl p-5 flex items-center gap-4 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
            <div className="pf-icon-chip w-10 h-10 rounded-lg shrink-0">
              <Github size={18} className="pf-ink" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft">GitHub</p>
              <p className="pf-ink font-semibold mt-0.5 text-sm">github.com/AadhityaS-2124</p>
            </div>
          </a>

          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="pf-card pf-card-int rounded-xl p-5 flex items-center gap-4 bg-[#FCFCFB] shadow-sm border border-[#E7E7E4]">
            <div className="pf-icon-chip w-10 h-10 rounded-lg shrink-0">
              <Linkedin size={18} className="pf-ink" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft">LinkedIn</p>
              <p className="pf-ink font-semibold mt-0.5 text-sm">linkedin.com/in/aadhityaspec</p>
            </div>
          </a>

          <div className="pf-panel rounded-xl p-5 bg-[#FCFCFB] border border-[#E7E7E4]">
            <p className="text-xs font-bold flex items-center gap-2 pf-ink pf-font-mono uppercase tracking-wider">
              <MIcon name="location_on" size={16} /> Location: Chennai, India
            </p>
            <p className="pf-ink-soft text-xs mt-1.5 leading-relaxed">Open to remote work and on-site relocation pipelines.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Footer + toast                                                         */
/* ---------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="w-full bg-[#FCFCFB] shadow-sm" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
          <span className="font-bold pf-ink pf-font-mono text-sm uppercase tracking-wider">aadhitya.dev</span>
          <span className="text-xs pf-ink-soft font-semibold pf-font-mono">© 2026 Aadhitya S. Typed via React &amp; Tailwind CSS.</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href={LINKS.githubProfile} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft hover:text-[#111111] transition-colors">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft hover:text-[#111111] transition-colors">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`} className="text-xs font-semibold uppercase tracking-wider pf-font-mono pf-ink-soft hover:text-[#111111] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <div
      className="pf-toast pf-card fixed bottom-6 left-1/2 z-50 rounded-xl px-5 py-3.5 text-xs flex items-center gap-2.5 bg-[#FCFCFB] border border-[#E7E7E4]"
      style={{ maxWidth: '92vw', boxShadow: '0 16px 36px rgba(17,17,17,0.12)' }}
    >
      <span className="pf-status-dot shrink-0 animate-ping absolute" />
      <span className="pf-status-dot shrink-0 relative" />
      <span className="pf-ink font-semibold pf-font-mono">{message}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Root                                                                   */
/* ---------------------------------------------------------------------- */

export default function Portfolio() {
  const [toast, setToast] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  function handleResumeRequestSuccess(email: string) {
    setResumeModalOpen(false);
    setToast(`PIPELINE SUCCESS // CV DISPATCHED TO ${email.toUpperCase()}`);
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }

  function handleGeneralContactSuccess(name: string) {
    setToast(`PIPELINE SUCCESS // ROUTED MESSAGE FROM ${name.split(' ')[0].toUpperCase()}`);
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }

  return (
    <div className="pf-root min-h-screen">
      <GlobalStyles />
      <div className="relative" style={{ zIndex: 1 }}>
        <NavBar onOpenResumeModal={() => setResumeModalOpen(true)} />
        <Hero />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection onContactSuccess={handleGeneralContactSuccess} />
        <Footer />
      </div>

      <ResumeRequestModal
        open={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onSuccess={handleResumeRequestSuccess}
      />

      {toast && <Toast message={toast} />}
    </div>
  );
}
