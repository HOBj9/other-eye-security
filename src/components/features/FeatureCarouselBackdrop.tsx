import { AnimatePresence, motion } from 'framer-motion';

type FeatureCarouselBackdropProps = {
  imageSrc?: string;
  activeIndex: number;
  reducedMotion: boolean | null;
};

/**
 * Full-bleed cinematic atmosphere for the carousel region.
 * Photo stays visible (blur + vignette + soft navy), never crushed by a flat opaque overlay.
 */
export function FeatureCarouselBackdrop({
  imageSrc,
  activeIndex,
  reducedMotion,
}: FeatureCarouselBackdropProps) {
  if (!imageSrc) return null;

  const enterExit = reducedMotion
    ? { duration: 0.28, ease: 'easeOut' as const }
    : { duration: 1.12, ease: [0.22, 1, 0.36, 1] as const };

  const drift = reducedMotion
    ? {}
    : {
        scale: [1, 1.045, 1],
        x: ['-1%', '1%', '-1%'],
        y: ['0.5%', '-0.5%', '0.5%'],
      };

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
      aria-hidden
    >
      {/* L0 — Active slide image: large, blurred, visibly luminous */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute inset-[-12%]"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.1, filter: 'blur(6px)' }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, filter: 'blur(28px)' }
            }
            transition={enterExit}
          >
            <motion.div
              className="relative h-full w-full"
              animate={drift}
              transition={
                reducedMotion ? {} : { duration: 20, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <img
                src={imageSrc}
                alt=""
                className="h-full min-h-full w-full min-w-full scale-105 object-cover object-center opacity-[0.62] saturate-[1.18] blur-[36px] dark:opacity-[0.58] dark:saturate-[1.12]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* L1 — Soft navy wash: gradient only (no flat 80% kill-switch) */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(165deg,rgba(11,16,35,0.52)_0%,rgba(11,16,35,0.18)_38%,rgba(11,16,35,0.28)_58%,rgba(11,16,35,0.62)_100%)]" />

      {/* L2 — Center luminosity + brand glow (lets the product color read through) */}
      <div className="absolute inset-0 z-2 bg-[radial-gradient(ellipse_95%_75%_at_50%_42%,rgba(112,107,207,0.42)_0%,rgba(91,87,184,0.14)_38%,transparent_68%)]" />

      {/* L3 — Purple ambient rails */}
      <div className="absolute inset-0 z-3 bg-linear-to-br from-[#5B57B8]/22 via-transparent to-[#706BCF]/20 opacity-90" />

      {/* L4 — Cinematic edge vignette (darkens corners only; center stays open) */}
      <div className="absolute inset-0 z-4 bg-[radial-gradient(ellipse_115%_95%_at_50%_48%,transparent_22%,rgba(11,16,35,0.55)_72%,rgba(11,16,35,0.88)_100%)]" />

      {/* L5 — Bottom weight for dots / lower edge readability */}
      <div className="absolute inset-0 z-5 bg-[linear-gradient(180deg,transparent_0%,transparent_48%,rgba(11,16,35,0.26)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,transparent_42%,rgba(11,16,35,0.42)_100%)]" />
    </div>
  );
}
