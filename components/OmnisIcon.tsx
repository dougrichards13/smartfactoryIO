import { motion } from 'framer-motion';

interface OmnisIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function OmnisIcon({ size = 48, className = '', animate = true }: OmnisIconProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Electric blue halo/glow effect */}
        <defs>
          <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id="omnisGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="outerGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer electric blue halo */}
        {animate ? (
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#haloGradient)"
            filter="url(#outerGlow)"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ) : (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#haloGradient)"
            filter="url(#outerGlow)"
          />
        )}

        {/* Main "O" shape */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="url(#omnisGradient)"
          strokeWidth="6"
          filter="url(#glow)"
        />

        {/* Inner wisdom symbol - stylized neural network/brain pattern */}
        <g transform="translate(50,50)" opacity="0.8">
          {/* Central node */}
          <circle cx="0" cy="0" r="3" fill="#3B82F6" />
          
          {/* Connecting nodes - representing knowledge/wisdom network */}
          <circle cx="-12" cy="-8" r="2" fill="#60A5FA" />
          <circle cx="12" cy="-8" r="2" fill="#60A5FA" />
          <circle cx="-12" cy="8" r="2" fill="#60A5FA" />
          <circle cx="12" cy="8" r="2" fill="#60A5FA" />
          <circle cx="0" cy="-15" r="2" fill="#60A5FA" />
          <circle cx="0" cy="15" r="2" fill="#60A5FA" />
          
          {/* Connection lines - representing knowledge flow */}
          <path
            d="M 0,0 L -12,-8 M 0,0 L 12,-8 M 0,0 L -12,8 M 0,0 L 12,8 M 0,0 L 0,-15 M 0,0 L 0,15"
            stroke="#60A5FA"
            strokeWidth="1"
            opacity="0.6"
          />
          
          {/* Additional wisdom indicators - small sparkles */}
          <g opacity="0.7">
            <path d="M-20,-12 L-18,-12 M-19,-13 L-19,-11" stroke="#93C5FD" strokeWidth="1"/>
            <path d="M20,-12 L22,-12 M21,-13 L21,-11" stroke="#93C5FD" strokeWidth="1"/>
            <path d="M-20,12 L-18,12 M-19,11 L-19,13" stroke="#93C5FD" strokeWidth="1"/>
            <path d="M20,12 L22,12 M21,11 L21,13" stroke="#93C5FD" strokeWidth="1"/>
          </g>
        </g>

        {/* Pulsing wisdom indicators around the perimeter */}
        {animate && (
          <>
            <motion.circle
              cx="20"
              cy="30"
              r="1"
              fill="#60A5FA"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="80"
              cy="30"
              r="1"
              fill="#60A5FA"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            />
            <motion.circle
              cx="20"
              cy="70"
              r="1"
              fill="#60A5FA"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
            />
            <motion.circle
              cx="80"
              cy="70"
              r="1"
              fill="#60A5FA"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}
      </svg>
    </div>
  );
}