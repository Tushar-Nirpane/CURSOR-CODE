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

  // Body and shadow colors
  const primaryColor = config.color;
  const shadowColor = config.darkColor;

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
      {/* Floating Status & Progress Badge above head (matches reference frames 004, 005, 006) */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1 flex flex-col items-center pointer-events-none"
        >
          {/* Label Tag */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="text-[10px] font-bold tracking-wider text-slate-200 uppercase font-among">
              {config.shortLabel}
            </span>
            {status === 'done' && (
              <span className="text-[9px] text-emerald-400 font-bold">✓</span>
            )}
            {status === 'failed' && (
              <span className="text-[9px] text-rose-400 font-bold">✕</span>
            )}
          </div>

          {/* Mini Progress Bar */}
          {(status === 'testing' || status === 'assigned' || status === 'submitting') && (
            <div className="w-16 h-1.5 bg-slate-800/90 rounded-full mt-0.5 border border-slate-700/60 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </motion.div>
      )}

      {/* Crewmate SVG Character */}
      <motion.div
        animate={
          isWorking
            ? {
                y: [0, -2, 0, -1, 0],
                rotate: [0, 0.8, -0.8, 0]
              }
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: isWorking ? 0.8 : 2.5,
          ease: 'easeInOut'
        }}
        className="relative"
        style={{
          transform: isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)'
        }}
      >
        <svg
          width="74"
          height="92"
          viewBox="0 0 74 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]"
        >
          {/* Defs for gradients & clip paths */}
          <defs>
            {/* Visor Cyan Glass Gradient */}
            <linearGradient id={`visor-grad-${config.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c5e6fe" />
              <stop offset="40%" stopColor="#7ec4f8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Visor Inner Glow */}
            <radialGradient id={`visor-glow-${config.id}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#7ec4f8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* Backpack (oxygen tank) */}
          <g id="backpack">
            <path
              d="M12 28 C12 22, 6 24, 6 32 L6 62 C6 70, 12 72, 12 68 Z"
              fill={shadowColor}
              stroke="#111827"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Left / Rear Leg */}
          <path
            d="M20 68 L20 84 C20 88, 28 88, 28 84 L28 68 Z"
            fill={shadowColor}
            stroke="#111827"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Right / Front Leg */}
          <path
            d="M36 68 L36 84 C36 88, 45 88, 45 84 L45 68 Z"
            fill={primaryColor}
            stroke="#111827"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Main Body (pill / capsule shape) */}
          <g id="body">
            <path
              d="M16 40 C16 16, 50 16, 50 40 L50 68 C50 74, 44 76, 36 76 L30 76 C22 76, 16 74, 16 68 Z"
              fill={primaryColor}
              stroke="#111827"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Body Shadow (curved shadow on lower torso) */}
            <path
              d="M18 56 C26 64, 42 64, 48 56 L48 68 C48 73, 42 74, 36 74 L30 74 C24 74, 18 73, 18 68 Z"
              fill={shadowColor}
            />
          </g>

          {/* Visor (iconic oval goggles) */}
          <g id="visor">
            <path
              d="M32 28 C48 28, 62 31, 62 40 C62 49, 48 51, 32 51 C25 51, 24 49, 24 40 C24 31, 25 28, 32 28 Z"
              fill={`url(#visor-grad-${config.id})`}
              stroke="#111827"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Visor spec reflection */}
            <ellipse
              cx="44"
              cy="34"
              rx="9"
              ry="4"
              transform="rotate(-8 44 34)"
              fill="#ffffff"
              fillOpacity="0.85"
            />
          </g>

          {/* Hat / Role Accessories */}
          {config.hat === 'fedora' && (
            // Classic black detective fedora for Reporting Officer Vance (matching frames 008, 009, 010!)
            <g id="fedora" transform="translate(10, 4)">
              {/* Brim */}
              <ellipse cx="26" cy="18" rx="26" ry="6" fill="#111827" stroke="#000" strokeWidth="2" />
              {/* Crown */}
              <path
                d="M12 18 C12 6, 20 5, 26 7 C32 5, 40 6, 40 18 Z"
                fill="#1f2937"
                stroke="#111827"
                strokeWidth="2.5"
              />
              {/* Hat band */}
              <path
                d="M12 16 C18 18, 34 18, 40 16 L40 18 C34 20, 18 20, 12 18 Z"
                fill="#4b5563"
              />
            </g>
          )}

          {config.hat === 'headset' && (
            // Receptionist Headset with mic
            <g id="headset" transform="translate(14, 12)">
              <path
                d="M4 14 C4 0, 36 0, 36 14"
                fill="none"
                stroke="#374151"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="4" cy="14" r="4.5" fill="#1f2937" stroke="#111" strokeWidth="2" />
              <circle cx="36" cy="14" r="4.5" fill="#1f2937" stroke="#111" strokeWidth="2" />
              {/* Mic boom */}
              <path
                d="M36 14 L42 24 L38 27"
                fill="none"
                stroke="#4b5563"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="37" cy="27" r="2.5" fill="#ef4444" />
            </g>
          )}

          {config.hat === 'goggles' && (
            // API Tester technical visor / VR band
            <g id="goggles" transform="translate(16, 14)">
              <rect x="6" y="6" width="30" height="5" rx="2.5" fill="#f59e0b" stroke="#111" strokeWidth="2" />
              <circle cx="12" cy="8" r="2" fill="#10b981" />
              <circle cx="28" cy="8" r="2" fill="#3b82f6" />
            </g>
          )}

          {config.hat === 'cap' && (
            // Functional tester red baseball cap / beanie
            <g id="cap" transform="translate(12, 10)">
              <path
                d="M10 14 C10 4, 34 4, 34 14 Z"
                fill="#b91c1c"
                stroke="#111"
                strokeWidth="2.5"
              />
              <path
                d="M26 14 C32 14, 46 16, 46 18 C46 20, 32 17, 26 16 Z"
                fill="#991b1b"
                stroke="#111"
                strokeWidth="2"
              />
            </g>
          )}

          {config.hat === 'shield' && (
            // Security badge / mini emblem
            <g id="shield" transform="translate(26, 10)">
              <path
                d="M6 4 L14 4 L14 10 C14 15, 10 18, 10 18 C10 18, 6 15, 6 10 Z"
                fill="#38bdf8"
                stroke="#111"
                strokeWidth="2"
              />
            </g>
          )}

          {config.hat === 'lock' && (
            // Privacy lock badge
            <g id="lock" transform="translate(26, 8)">
              <rect x="4" y="6" width="12" height="9" rx="2" fill="#0284c7" stroke="#111" strokeWidth="2" />
              <path d="M7 6 L7 3 C7 1.5, 13 1.5, 13 3 L13 6" fill="none" stroke="#e0f2fe" strokeWidth="2" />
            </g>
          )}

          {config.hat === 'tie' && (
            // Sleek necktie on chest
            <g id="tie" transform="translate(27, 48)">
              <polygon points="4,0 8,0 7,12 6,15 5,12" fill="#1e293b" stroke="#111" strokeWidth="1.5" />
            </g>
          )}

          {/* Reporting Officer Clipboard in hand (Frame 008, 009) */}
          {config.id === 'reporting_officer' && (
            <g id="clipboard" transform="translate(42, 44)">
              <rect x="0" y="0" width="18" height="24" rx="2" fill="#f8fafc" stroke="#111" strokeWidth="2" />
              <rect x="4" y="-3" width="10" height="4" rx="1.5" fill="#475569" stroke="#111" strokeWidth="1.5" />
              {/* Lines of text on clipboard */}
              <line x1="3" y1="6" x2="15" y2="6" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="3" y1="10" x2="13" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="3" y1="14" x2="14" y2="14" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="3" y1="18" x2="10" y2="18" stroke="#38bdf8" strokeWidth="1.5" />
            </g>
          )}
        </svg>

        {/* Selected glowing ring */}
        {isSelected && (
          <div
            className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-ping opacity-30 pointer-events-none"
            style={{ borderRadius: '50%' }}
          />
        )}
      </motion.div>

      {/* Shadow on Floor */}
      <div
        className="w-12 h-3 bg-black/40 rounded-full blur-[2px] -mt-1 pointer-events-none"
        style={{
          transform: isSelected ? 'scale(1.2)' : 'scale(1)'
        }}
      />
    </div>
  );
};
