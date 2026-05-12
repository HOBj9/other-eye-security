import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type AnimatedSecurityLogoProps = {
  className?: string;
  size?: number | string;
  /** ambient: float loop (default). static: no internal motion — parent drives transform. */
  motionProfile?: 'ambient' | 'static';
};

export function AnimatedSecurityLogo({
  className = '',
  size = 320,
  motionProfile = 'ambient',
}: AnimatedSecurityLogoProps) {
  const numericSize = typeof size === 'number' ? `${size}px` : size;
  const [inlineSvg, setInlineSvg] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    void fetch('/Untitled-1.svg')
      .then((res) => res.text())
      .then((svgText) => {
        if (mounted) setInlineSvg(svgText);
      })
      .catch(() => {
        if (mounted) setInlineSvg('');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const svgMarkup = useMemo(() => inlineSvg, [inlineSvg]);

  const inner = (
    <div className="relative z-10 h-full w-full">
      <div
        className="h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain drop-shadow-[0_0_35px_rgba(120,100,255,0.5)] dark:brightness-0 dark:invert"
        dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
      />
    </div>
  );

  if (motionProfile === 'static') {
    return (
      <div
        className={`relative inline-flex items-center justify-center text-primary dark:text-white ${className}`}
        style={{ width: numericSize, height: numericSize, maxWidth: '100%', maxHeight: '100%' }}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center text-primary dark:text-white ${className}`}
      style={{ width: numericSize, height: numericSize, maxWidth: '100%', maxHeight: '100%' }}
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{
        opacity: 1,
        y: [0, -4, 0],
        scale: [1, 1.015, 1],
      }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut' },
        y: { duration: 4.8, ease: 'easeInOut', repeat: Infinity },
        scale: { duration: 4.8, ease: 'easeInOut', repeat: Infinity },
      }}
    >
      {inner}
    </motion.div>
  );
}
