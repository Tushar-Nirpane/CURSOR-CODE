import React from 'react';
import { motion } from 'framer-motion';
import { AgentConfig, AgentStatus } from '../types/qa';

interface CrewmateProps {
  config: AgentConfig;
  status: AgentStatus;
  progress?: number;
  isSelected?: boolean;
  onClick?: () => void;
  isWorking?: boolean;
  scale?: number;
  showBadge?: boolean;
}

export const Crewmate: React.FC<CrewmateProps> = ({
  config,
  status,
  progress = 0,
  isSelected = false,
  onClick,
  isWorking = false,
  scale = 1,
  showBadge = true
}) => {
  const isFacingLeft = config.facing === 'left';
  const primaryColor = config.color;
  const shadowColor = config.darkColor;

  // Decide facial expression based on state
  const isHappy = status === 'done';
  const isAlert = status === 'failed';
  const isBusy = isWorking || status === 'testing' || status === 'submitting';

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center cursor-pointer select-none transition-transform duration-200 group ${
        isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-20'
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center'
      }}
    >
      {/* Floating Status & Progress HUD Badge (Matches the exact style from the reference image!) */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1.5 flex flex-col items-center pointer-events-none z-30"
        >
          {/* Main Status Capsule */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0b131f]/95 border border-[#1e3a5f]/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)] backdrop-blur-md">
            {/* Green glowing checkmark icon like reference image */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/80 flex items-center justify-center">
              {status === 'failed' ? (
                <span className="text-[9px] font-black text-rose-400 leading-none">✕</span>
              ) : (
                <span className="text-[9px] font-black text-[#34d399] leading-none drop-shadow-[0_0_4px_#10b981]">✓</span>
              )}
            </div>

            <span className="text-[10px] font-black tracking-wider text-slate-100 uppercase font-mono drop-shadow">
              {config.shortLabel}
            </span>
          </div>

          {/* Holographic Glowing Progress Bar */}
          <div className="w-20 h-1.5 bg-[#0b131f]/90 rounded-full mt-1 border border-[#1e3a5f]/60 p-[1px] overflow-hidden shadow-[0_0_8px_rgba(16,185,129,0.25)]">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                status === 'failed'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                  : 'bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#38bdf8] shadow-[0_0_6px_#10b981]'
              }`}
              initial={{ width: '25%' }}
              animate={{
                width: status === 'done' ? '100%' : `${Math.min(100, Math.max(15, progress))}%`
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Retro Sci-Fi CRT Robot Character */}
      <motion.div
        animate={
          isWorking
            ? {
                y: [0, -2.5, 0, -1.5, 0],
                rotate: [0, 0.6, -0.6, 0]
              }
            : {
                y: [0, -1.5, 0]
              }
        }
        transition={{
          repeat: Infinity,
          duration: isWorking ? 0.7 : 3,
          ease: 'easeInOut'
        }}
        className="relative"
        style={{
          transform: isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)'
        }}
      >
        <svg
          width="88"
          height="102"
          viewBox="0 0 88 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Screen Phosphor Glow Filter */}
            <filter id={`screen-glow-${config.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* CRT Screen Radial Gradient */}
            <radialGradient id={`crt-glass-${config.id}`} cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#0a2a1f" />
              <stop offset="60%" stopColor="#061c14" />
              <stop offset="100%" stopColor="#03110c" />
            </radialGradient>

            {/* Metallic Suit Gradient */}
            <linearGradient id={`suit-grad-${config.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={shadowColor} />
            </linearGradient>

            {/* Monitor Casing Gradient */}
            <linearGradient id={`monitor-casing-${config.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Laptop Metallic Gradient */}
            <linearGradient id="laptop-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* ================= BACKPACK (Power/Oxygen Pack) ================= */}
          <g id="backpack">
            {/* Main Pack */}
            <rect
              x="8"
              y="44"
              width="14"
              height="36"
              rx="5"
              fill={shadowColor}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Battery Level Strip */}
            <rect x="11" y="52" width="3.5" height="18" rx="1.5" fill="#0f172a" />
            <rect x="12" y="54" width="2" height="6" rx="1" fill="#34d399" />
            <rect x="12" y="62" width="2" height="6" rx="1" fill="#38bdf8" />
          </g>

          {/* ================= LEGS & BOOTS ================= */}
          <g id="legs">
            {/* Left / Rear Leg */}
            <path
              d="M26 76 L26 91 C26 94, 34 94, 34 91 L34 76 Z"
              fill={shadowColor}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Left Boot Sole */}
            <rect x="23" y="90" width="13" height="4" rx="2" fill="#0f172a" />

            {/* Right / Front Leg */}
            <path
              d="M44 76 L44 91 C44 94, 53 94, 53 91 L53 76 Z"
              fill={`url(#suit-grad-${config.id})`}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Right Boot Sole */}
            <rect x="42" y="90" width="13" height="4" rx="2" fill="#0f172a" />
          </g>

          {/* ================= MAIN TORSO / SPACESUIT BODY ================= */}
          <g id="torso">
            {/* Astronaut Torso */}
            <path
              d="M20 48 C20 40, 60 40, 60 48 L60 76 C60 82, 54 84, 46 84 L34 84 C26 84, 20 82, 20 76 Z"
              fill={`url(#suit-grad-${config.id})`}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Torso Shadow Contour */}
            <path
              d="M22 66 C32 74, 50 74, 58 66 L58 76 C58 81, 52 82, 46 82 L34 82 C28 82, 22 81, 22 76 Z"
              fill={shadowColor}
            />

            {/* Collar Band / Neck Ring */}
            <path
              d="M27 42 C33 40, 47 40, 53 42 L53 47 C47 45, 33 45, 27 47 Z"
              fill="#cbd5e1"
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Chest Emblem / Badge (Tailored to each role like the reference image!) */}
            <g id="chest-emblem" transform="translate(32, 52)">
              {/* Badge Screen Plate */}
              <rect
                x="0"
                y="0"
                width="16"
                height="13"
                rx="3.5"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Security Shield Icon (like Pink robot in image!) */}
              {(config.id === 'cybersecurity' || config.hat === 'shield') && (
                <path
                  d="M8 2.5 L12 4 L12 7 C12 9.5, 8 11.5, 8 11.5 C8 11.5, 4 9.5, 4 7 L4 4 Z"
                  fill="#10b981"
                  stroke="#34d399"
                  strokeWidth="1"
                />
              )}

              {/* Integration / Performance Speedometer Gauge (like Red robot in image!) */}
              {(config.id === 'integration_edge' || config.id === 'performance') && (
                <g transform="translate(3.5, 2)">
                  <path d="M1 7 A4 4 0 0 1 8 7" fill="none" stroke="#34d399" strokeWidth="1.5" />
                  <line x1="4.5" y1="7" x2="6.5" y2="4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              )}

              {/* API / Terminal Code Icon */}
              {config.id === 'backend_api' && (
                <text x="3.5" y="9.5" fill="#34d399" fontSize="7" fontWeight="bold" fontFamily="monospace">
                  &gt;_
                </text>
              )}

              {/* Privacy Padlock Icon */}
              {config.id === 'privacy_data' && (
                <g transform="translate(4.5, 2.5)">
                  <rect x="1" y="3" width="5.5" height="5" rx="1" fill="#34d399" />
                  <path d="M2.5 3 L2.5 1.5 C2.5 0.7, 5 0.7, 5 1.5 L5 3" fill="none" stroke="#34d399" strokeWidth="1" />
                </g>
              )}

              {/* Receptionist Heart / Star Icon */}
              {config.id === 'receptionist' && (
                <path
                  d="M8 10.5 L3.5 6 C2 4.5, 4 2, 6 3.5 L8 5.5 L10 3.5 C12 2, 14 4.5, 12.5 6 Z"
                  fill="#f43f5e"
                />
              )}

              {/* Reporting Officer Star Badge */}
              {config.id === 'reporting_officer' && (
                <polygon
                  points="8,2 9.5,5.5 13,5.5 10.5,7.5 11.5,11 8,9 4.5,11 5.5,7.5 3,5.5 6.5,5.5"
                  fill="#fbbf24"
                />
              )}

              {/* Functional Tester Checkmark */}
              {config.id === 'frontend_func' && (
                <path
                  d="M4 6.5 L6.5 9 L12 3.5"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </g>
          </g>

          {/* ================= CRT MONITOR HEAD (The Signature Look!) ================= */}
          <g id="crt-monitor-head">
            {/* Monitor Outer Chassis */}
            <rect
              x="14"
              y="10"
              width="52"
              height="38"
              rx="7"
              fill={`url(#monitor-casing-${config.id})`}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Monitor Chassis Top Highlight & Bevel */}
            <path
              d="M18 13 L62 13"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Corner Screws / Rivets */}
            <circle cx="18" cy="14" r="1.2" fill="#64748b" />
            <circle cx="62" cy="14" r="1.2" fill="#64748b" />

            {/* Recessed CRT Screen Frame */}
            <rect
              x="19"
              y="15"
              width="42"
              height="28"
              rx="4.5"
              fill={`url(#crt-glass-${config.id})`}
              stroke="#091410"
              strokeWidth="2"
            />

            {/* Subtle Horizontal CRT Scanlines Overlay */}
            <g opacity="0.18" stroke="#34d399" strokeWidth="0.8">
              <line x1="20" y1="18" x2="60" y2="18" />
              <line x1="20" y1="22" x2="60" y2="22" />
              <line x1="20" y1="26" x2="60" y2="26" />
              <line x1="20" y1="30" x2="60" y2="30" />
              <line x1="20" y1="34" x2="60" y2="34" />
              <line x1="20" y1="38" x2="60" y2="38" />
            </g>

            {/* Screen Glass Curved Highlight Reflection */}
            <path
              d="M21 17 Q40 18 57 23 L55 25 Q38 20 21 19 Z"
              fill="#ffffff"
              fillOpacity="0.16"
            />

            {/* ================= GLOWING DIGITAL CRT FACE ================= */}
            <g
              id="digital-face"
              filter={`url(#screen-glow-${config.id})`}
              transform="translate(24, 18)"
            >
              {/* HAPPY / DONE FACE (^ _ ^) */}
              {isHappy && (
                <>
                  {/* Left Eye */}
                  <path d="M4 11 Q8 5 12 11" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Right Eye */}
                  <path d="M20 11 Q24 5 28 11" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Big Cheerful Mouth */}
                  <path d="M12 16 Q16 20 20 16" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />
                </>
              )}

              {/* ALERT / FAILED FACE (O _ O) */}
              {isAlert && (
                <>
                  {/* Wide Left Eye */}
                  <circle cx="8" cy="9" r="3.5" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
                  {/* Wide Right Eye */}
                  <circle cx="24" cy="9" r="3.5" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
                  {/* Wavy Concerned Mouth */}
                  <path d="M11 17 Q14 15 16 17 Q18 19 21 17" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                </>
              )}

              {/* ACTIVE WORKING / TESTING FACE (Smiling focused ^ _ ^) */}
              {isBusy && !isHappy && !isAlert && (
                <>
                  {/* Left Eye (Curved happy squint) */}
                  <path d="M5 10 Q8 6 11 10" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Right Eye (Curved happy squint) */}
                  <path d="M21 10 Q24 6 27 10" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Digital Smile */}
                  <path d="M13 15 Q16 18 19 15" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                  {/* Rosy Digital Cheek Pixels */}
                  <rect x="3" y="13" width="3" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.7" />
                  <rect x="26" y="13" width="3" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.7" />
                </>
              )}

              {/* IDLE / NORMAL FACE (Cute round eyes & smile • _ • or ^ _ ^) */}
              {!isBusy && !isHappy && !isAlert && (
                <>
                  {/* If reporting officer: Cool focused eyes */}
                  {config.id === 'reporting_officer' ? (
                    <>
                      <rect x="6" y="9" width="6" height="3" rx="1.5" fill="#34d399" />
                      <rect x="20" y="9" width="6" height="3" rx="1.5" fill="#34d399" />
                      <line x1="14" y1="16" x2="18" y2="16" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Left Eye */}
                      <path d="M5 10 Q8 6 11 10" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" />
                      {/* Right Eye */}
                      <path d="M21 10 Q24 6 27 10" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" />
                      {/* Sweet Smile */}
                      <path d="M13 15 Q16 17.5 19 15" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                      {/* Cheek pixels */}
                      <circle cx="4" cy="13" r="1.2" fill="#34d399" fillOpacity="0.5" />
                      <circle cx="28" cy="13" r="1.2" fill="#34d399" fillOpacity="0.5" />
                    </>
                  )}
                </>
              )}
            </g>
          </g>

          {/* ================= CHUNKY OVER-EAR HEADPHONES ================= */}
          <g id="headphones">
            {/* Headphone Arched Band across the top */}
            <path
              d="M14 26 C14 4, 66 4, 66 26"
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M16 26 C16 7, 64 7, 64 26"
              fill="none"
              stroke="#334155"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left Ear Cup */}
            <g transform="translate(7, 18)">
              {/* Outer Shell */}
              <rect
                x="0"
                y="0"
                width="8.5"
                height="20"
                rx="4"
                fill={primaryColor}
                stroke="#0f172a"
                strokeWidth="3"
              />
              {/* Inner Cushion */}
              <rect x="5.5" y="2" width="3" height="16" rx="1.5" fill="#1e293b" />
              {/* Accent Hub */}
              <circle cx="4" cy="10" r="2.2" fill="#0f172a" />
            </g>

            {/* Right Ear Cup */}
            <g transform="translate(64.5, 18)">
              {/* Inner Cushion */}
              <rect x="0" y="2" width="3" height="16" rx="1.5" fill="#1e293b" />
              {/* Outer Shell */}
              <rect
                x="0"
                y="0"
                width="8.5"
                height="20"
                rx="4"
                fill={primaryColor}
                stroke="#0f172a"
                strokeWidth="3"
              />
              {/* Accent Hub */}
              <circle cx="4.5" cy="10" r="2.2" fill="#0f172a" />
            </g>

            {/* Headset Mic Boom (for receptionist or headset users) */}
            {(config.hat === 'headset' || config.id === 'receptionist') && (
              <g id="mic-boom" transform="translate(67, 30)">
                <path
                  d="M0 0 L6 8 L-4 14"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="-5" cy="14" r="3" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* ================= HATS & SIGNATURE ACCESSORIES ================= */}

          {/* 1. BROWN EXPLORER / SAFARI SLOUCH HAT (Matches the Top-Left API Robot in Reference Image!) */}
          {(config.hat === 'explorer' || (config.id === 'backend_api' && config.hat !== 'none')) && (
            <g id="explorer-hat" transform="translate(14, -8)">
              {/* Wide Curved Brim */}
              <path
                d="M-4 22 C6 18, 46 18, 56 22 C46 25, 6 25, -4 22 Z"
                fill="#854d0e"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Hat Crown */}
              <path
                d="M8 20 C10 6, 20 4, 26 5 C32 4, 42 6, 44 20 Z"
                fill="#a16207"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Hat Crown Crease indentation */}
              <path d="M22 6 Q26 9 30 6" fill="none" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
              {/* Dark Brown Hatband */}
              <path
                d="M8 18 C16 19.5, 36 19.5, 44 18 L44 20.5 C36 22, 16 22, 8 20.5 Z"
                fill="#451a03"
              />
              {/* Small Feather / Pin Badge */}
              <path d="M38 18 L44 11 L41 19 Z" fill="#22c55e" stroke="#0f172a" strokeWidth="1" />
            </g>
          )}

          {/* 2. DARK NOIR DETECTIVE FEDORA (Matches the Top-Right Reporting Officer in Reference Image!) */}
          {(config.hat === 'fedora' || (config.id === 'reporting_officer' && config.hat !== 'explorer')) && (
            <g id="detective-fedora" transform="translate(14, -8)">
              {/* Brim */}
              <ellipse
                cx="26"
                cy="22"
                rx="30"
                ry="6"
                fill="#0f172a"
                stroke="#000000"
                strokeWidth="2.5"
              />
              {/* Crown */}
              <path
                d="M10 21 C11 7, 19 5, 26 7 C33 5, 41 7, 42 21 Z"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Crown Dent */}
              <path d="M21 7 Q26 10 31 7" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sleek Dark Hatband */}
              <path
                d="M10 19 C18 20.5, 34 20.5, 42 19 L42 21.5 C34 23, 18 23, 10 21.5 Z"
                fill="#475569"
              />
            </g>
          )}

          {/* 3. CAP (Baseball cap) */}
          {config.hat === 'cap' && (
            <g id="baseball-cap" transform="translate(18, -4)">
              <path
                d="M6 18 C8 8, 36 8, 38 18 Z"
                fill="#b91c1c"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <path
                d="M30 18 C38 18, 50 20, 50 22 C50 24, 38 21, 30 20 Z"
                fill="#991b1b"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* ================= ARMS & HANDS / INTERACTION PROPS ================= */}

          {/* Special Pose: Reporting Officer Vance holding Spiral Notepad & Pen (like Reference Image!) */}
          {config.id === 'reporting_officer' ? (
            <g id="officer-notepad" transform="translate(42, 50)">
              {/* Spiral Notepad */}
              <rect
                x="0"
                y="0"
                width="22"
                height="30"
                rx="2"
                fill="#f8fafc"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              {/* Top Spiral Rings */}
              <g stroke="#334155" strokeWidth="1.5">
                <line x1="3" y1="-2" x2="3" y2="2" />
                <line x1="7" y1="-2" x2="7" y2="2" />
                <line x1="11" y1="-2" x2="11" y2="2" />
                <line x1="15" y1="-2" x2="15" y2="2" />
                <line x1="19" y1="-2" x2="19" y2="2" />
              </g>
              {/* Handwritten Note Lines */}
              <line x1="4" y1="7" x2="18" y2="7" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="12" x2="16" y2="12" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="17" x2="18" y2="17" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="22" x2="12" y2="22" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />

              {/* Detective Pen & Hand */}
              <g transform="translate(18, 14)">
                {/* Pen */}
                <line x1="-3" y1="8" x2="8" y2="-4" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <circle cx="-3" cy="8" r="1.5" fill="#f8fafc" />
                {/* Right Robot Hand */}
                <circle cx="2" cy="2" r="4.5" fill={primaryColor} stroke="#0f172a" strokeWidth="2.5" />
              </g>

              {/* Left Hand holding notepad side */}
              <circle cx="1" cy="15" r="4" fill={primaryColor} stroke="#0f172a" strokeWidth="2.5" />
            </g>
          ) : (
            /* General Specialist Arms & Hands */
            <g id="specialist-arms">
              {/* Left Arm & Hand */}
              <g id="arm-left">
                <path
                  d="M20 54 Q15 64 22 72"
                  fill="none"
                  stroke={shadowColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="22" cy="72" r="4" fill={primaryColor} stroke="#0f172a" strokeWidth="2.5" />
              </g>

              {/* Right Arm & Hand */}
              <g id="arm-right">
                <path
                  d="M58 54 Q65 64 56 72"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="56" cy="72" r="4" fill={primaryColor} stroke="#0f172a" strokeWidth="2.5" />
              </g>

              {/* When Working: Mini Metallic Laptop in front of hands (like Top-Left Robot in Image!) */}
              {isWorking && (
                <g id="mini-laptop" transform="translate(26, 64)">
                  {/* Laptop Base */}
                  <polygon
                    points="0,15 28,15 32,22 -4,22"
                    fill="url(#laptop-grad)"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                  {/* Keyboard Rows */}
                  <line x1="2" y1="18" x2="26" y2="18" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="0" y1="20" x2="28" y2="20" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Laptop Screen Open */}
                  <polygon
                    points="2,15 26,15 24,2 4,2"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1.8"
                  />
                  {/* Glowing Screen Matrix */}
                  <polygon
                    points="4,14 24,14 22,4 6,4"
                    fill="#062e22"
                  />
                  <line x1="7" y1="7" x2="20" y2="7" stroke="#34d399" strokeWidth="1.2" />
                  <line x1="7" y1="10" x2="16" y2="10" stroke="#38bdf8" strokeWidth="1.2" />

                  {/* Cute Cat / Mascot Sticker on Laptop if API Tester! */}
                  {config.id === 'backend_api' && (
                    <circle cx="20" cy="11" r="1.5" fill="#f59e0b" />
                  )}
                </g>
              )}
            </g>
          )}
        </svg>

        {/* Selected glowing target ring */}
        {isSelected && (
          <div
            className="absolute -inset-2 rounded-2xl border-2 border-[#34d399] animate-ping opacity-35 pointer-events-none"
          />
        )}
      </motion.div>

      {/* Shadow on Floor */}
      <div
        className="w-14 h-3.5 bg-black/50 rounded-full blur-[2px] -mt-1 pointer-events-none"
        style={{
          transform: isSelected ? 'scale(1.2)' : 'scale(1)'
        }}
      />
    </div>
  );
};
