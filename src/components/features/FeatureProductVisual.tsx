import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

type FeatureProductVisualProps = {
  src: string;
  /** Accessible label (visual is decorative in layout). */
  title: string;
  compact?: boolean;
};

/**
 * Hero product visual for the active feature card only — contained, floating, cinematic entrance.
 */
export function FeatureProductVisual({ src, title, compact }: FeatureProductVisualProps) {
  const reducedMotion = useReducedMotion();

  const entrance = reducedMotion
    ? { duration: 0.22, ease: 'easeOut' as const }
    : { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative flex w-full max-w-full flex-col items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={src}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.94, filter: 'blur(12px)' }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12, scale: 1.03, filter: 'blur(10px)' }
          }
          transition={entrance}
          className="relative flex w-full justify-center px-1"
        >
          <span className="sr-only">{title}</span>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(200px,52vw)] w-[min(340px,94%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(112,107,207,0.38)_0%,rgba(91,87,184,0.12)_45%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(112,107,207,0.45)_0%,rgba(91,87,184,0.15)_48%,transparent_74%)]"
            aria-hidden
          />

          <motion.img
            src={src}
            alt=""
            draggable={false}
            animate={reducedMotion ? {} : { y: [0, -5.5, 0] }}
            transition={
              reducedMotion ? {} : { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }
            }
            className={cn(
              'relative z-1 w-auto max-w-[90%] select-none object-contain object-center',
              'drop-shadow-[0_24px_50px_-14px_rgba(15,23,42,0.55)]',
              'dark:drop-shadow-[0_32px_64px_-10px_rgba(91,87,184,0.42)]',
              compact
                ? 'max-h-[min(42vw,168px)] sm:max-h-[min(34vw,184px)]'
                : 'max-h-[min(28vw,200px)] sm:max-h-[min(24vw,210px)]',
            )}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
