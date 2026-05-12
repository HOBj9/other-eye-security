import { motion, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';
import { useTheme } from '../../context/useTheme';

const TRANSITION = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 26,
  mass: 0.72,
};

const CX = 32;
const CY = 32;

/** مسار سداسي منتظم — يشبه فتحة العدسة الميكانيكية، لا شكل العين. */
function hexPath(r: number): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    pts.push([CX + r * Math.cos(a), CY + r * Math.sin(a)]);
  }
  return (
    pts.map((p, i) => (i === 0 ? `M ${p[0].toFixed(2)} ${p[1].toFixed(2)}` : `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)).join(' ') +
    ' Z'
  );
}

export function EyeThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');

  const open = !isDark;
  const rHexOpen = hovered && !reduceMotion && open ? 11.6 : 11.1;
  const dOpen = hexPath(rHexOpen);
  const dClosed = hexPath(4.85);

  const gidStroke = `lt-${uid}-stroke`;
  const gidMetal = `lt-${uid}-metal`;
  const gidGlass = `lt-${uid}-glass`;
  const gidFlare = `lt-${uid}-flare`;

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#706BCF]"
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      animate={{
        boxShadow: isDark
          ? '0 8px 26px rgba(2, 6, 23, 0.45), 0 0 30px rgba(91, 87, 184, 0.2)'
          : '0 10px 30px rgba(112, 107, 207, 0.35), 0 0 42px rgba(140, 120, 255, 0.45)',
      }}
      transition={TRANSITION}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 72% 50%, rgba(91,87,184,0.35), transparent 55%), linear-gradient(120deg, rgba(12,18,43,0.9), rgba(5,8,22,0.95))'
            : 'radial-gradient(circle at 30% 40%, rgba(140,120,255,0.45), transparent 58%), linear-gradient(120deg, rgba(245,247,255,0.9), rgba(221,226,255,0.75))',
        }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      <motion.span
        className="pointer-events-none absolute inset-0 -z-10 blur-xl"
        animate={{
          opacity: isDark ? 0.35 : 0.75,
          scale: isDark ? 0.95 : 1.1,
          rotate: isDark ? -8 : 8,
          background: 'radial-gradient(circle, rgba(112,107,207,0.55), rgba(112,107,207,0.1))',
        }}
        transition={TRANSITION}
      />

      <motion.svg
        viewBox="0 0 64 64"
        className="relative z-10 h-[2.35rem] w-[2.45rem]"
        initial={false}
        animate={!reduceMotion && hovered ? { rotate: [0, 4, -3, 0] } : { rotate: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id={gidStroke} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8A86E8' : '#5B57B8'} />
            <stop offset="100%" stopColor={isDark ? '#B4B0FF' : '#706BCF'} />
          </linearGradient>
          <linearGradient id={gidMetal} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#2a2f4a' : '#e8e6ff'} />
            <stop offset="50%" stopColor={isDark ? '#151a30' : '#c9c4f5'} />
            <stop offset="100%" stopColor={isDark ? '#0d1020' : '#a39de8'} />
          </linearGradient>
          <radialGradient id={gidGlass} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor={isDark ? 'rgba(200,198,255,0.2)' : 'rgba(255,255,255,0.75)'} />
            <stop offset="55%" stopColor={isDark ? 'rgba(40,45,80,0.35)' : 'rgba(200,205,255,0.35)'} />
            <stop offset="100%" stopColor={isDark ? 'rgba(8,10,22,0.55)' : 'rgba(91,87,184,0.2)'} />
          </radialGradient>
          <radialGradient id={gidFlare} cx="32%" cy="28%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* مساند ربط العدسة (شكل عدسة حقيقية أكثر من العين) */}
        <rect x="2" y="26" width="5" height="12" rx="1.2" fill={`url(#${gidMetal})`} stroke={`url(#${gidStroke})`} strokeWidth="0.6" />
        <rect x="57" y="26" width="5" height="12" rx="1.2" fill={`url(#${gidMetal})`} stroke={`url(#${gidStroke})`} strokeWidth="0.6" />

        {/* حلقات بروز — واجهة العدسة دائرية بالكامل */}
        <circle
          cx={CX}
          cy={CY}
          r="26.5"
          fill="none"
          stroke={`url(#${gidStroke})`}
          strokeWidth="2.2"
        />
        <circle cx={CX} cy={CY} r="23.5" fill="none" stroke={`url(#${gidStroke})`} strokeWidth="1" strokeOpacity="0.45" />
        <circle cx={CX} cy={CY} r="20.2" fill={`url(#${gidGlass})`} stroke={`url(#${gidStroke})`} strokeWidth="0.9" strokeOpacity="0.5" />

        {/* علامات مسافة على الحلقة الخارجية (مثل عدسة حقيقية) */}
        <g stroke={`url(#${gidStroke})`} strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = CX + Math.cos(a) * 24.2;
            const y1 = CY + Math.sin(a) * 24.2;
            const x2 = CX + Math.cos(a) * 26.2;
            const y2 = CY + Math.sin(a) * 26.2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* حلقة داخلية — عنصر زجاجي */}
        <circle cx={CX} cy={CY} r="16.5" fill="none" stroke={`url(#${gidStroke})`} strokeWidth="0.85" strokeOpacity="0.4" />

        {/* فتحة ميكانيكية سداسية: تتسع / تضيق */}
        <motion.path
          fill={isDark ? 'rgba(4,6,16,0.92)' : 'rgba(255,255,255,0.38)'}
          stroke={`url(#${gidStroke})`}
          strokeWidth="1.15"
          strokeLinejoin="round"
          initial={false}
          animate={{ d: open ? dOpen : dClosed }}
          transition={TRANSITION}
        />

        {/* لمعان دائري على الزجاج — لا بيضاوية عين */}
        <circle cx="26" cy="24" r="4.5" fill={`url(#${gidFlare})`} fillOpacity={open ? 0.55 : 0.18} />

        <circle cx={CX} cy={CY} r="3.2" fill={isDark ? '#03050f' : 'rgba(91,87,184,0.35)'} fillOpacity={open ? 0.4 : 0.85} />
      </motion.svg>

      <span className="sr-only">{theme === 'dark' ? 'الوضع الداكن' : 'الوضع الفاتح'}</span>
    </motion.button>
  );
}
