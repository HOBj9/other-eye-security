import { AnimatePresence, motion } from 'framer-motion';

export type ServiceCardContentProps = {
  title: string;
  summary: string;
  detail: string;
  index: number;
  isActive: boolean;
  compact?: boolean;
  /** Desktop stack only: hide dense body copy so semi-overlapping cards do not ghost text together. */
  stackPeek?: boolean;
};

export function ServiceCardContent({
  title,
  summary,
  detail,
  index,
  isActive,
  compact = false,
  stackPeek = false,
}: ServiceCardContentProps) {
  const titleSize = compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl';

  return (
    <div className="relative z-10 flex h-full flex-col">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-300">
        Service {index + 1}
      </p>
      <h3
        className={`text-heading mt-3 font-semibold ${titleSize} ${stackPeek ? 'line-clamp-2 wrap-anywhere' : ''}`}
      >
        {title}
      </h3>

      {!stackPeek ? (
        <p
          className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ${
            isActive ? 'text-body' : 'text-muted line-clamp-2'
          }`}
        >
          {summary}
        </p>
      ) : (
        <div className="mt-3 min-h-10 shrink-0" aria-hidden />
      )}

      <div className={`mt-auto ${compact ? 'pt-5' : 'pt-6'}`}>
        <motion.div
          className="h-1 rounded-full bg-slate-800/16 dark:bg-white/20"
          animate={{
            width: isActive ? '100%' : '46%',
            opacity: isActive ? 1 : 0.6,
          }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.div
            className="h-full rounded-full bg-linear-to-l from-(--color-primary) to-(--color-primary-soft) shadow-[0_0_14px_var(--feature-card-glow)]"
            animate={{ width: isActive ? '82%' : '34%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {!stackPeek ? (
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.p
                key={`${title}-detail`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-body mt-4 text-sm leading-relaxed"
              >
                {detail}
              </motion.p>
            ) : (
              <motion.p
                key={`${title}-hint`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="text-muted mt-4 text-xs uppercase tracking-[0.16em]"
              >
                Press to focus
              </motion.p>
            )}
          </AnimatePresence>
        ) : (
          <div className="mt-4 h-10 shrink-0" aria-hidden />
        )}
      </div>
    </div>
  );
}
