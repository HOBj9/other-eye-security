'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';

export type ProcessCardProps = {
  stepNumber: number;
  title: string;
  points: readonly [string, string];
  icon: IconType;
};

/**
 * Premium glass step card — surfaces follow theme (light: airy glass + dark text; dark: navy glass + light text).
 * Hover via Framer; scroll reveal stays on parent ScrollReveal.
 */
export function ProcessCard({ stepNumber, title, points, icon: Icon }: ProcessCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-3xl',
        'border border-(--border-soft) bg-[color-mix(in_srgb,var(--card)_92%,transparent)]',
        'shadow-[0_10px_36px_-14px_rgba(91,87,184,0.18)]',
        'backdrop-blur-2xl backdrop-saturate-150',
        'transition-[border-color,box-shadow,transform] duration-500 ease-out',
        'hover:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]',
        'hover:shadow-[0_22px_50px_-18px_rgba(112,107,207,0.28)]',
        'dark:border-white/12 dark:bg-white/6 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]',
        'dark:hover:border-[#706BCF]/45 dark:hover:shadow-[0_24px_60px_-20px_rgba(112,107,207,0.35)]',
        'motion-reduce:transform-none motion-reduce:hover:transform-none',
        'p-6 sm:p-7',
      ].join(' ')}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.025,
              y: -6,
            }
      }
      transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.85 }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#706BCF]/12 blur-3xl transition-opacity duration-500 group-hover:bg-[#706BCF]/22 dark:bg-[#706BCF]/20 dark:group-hover:bg-[#706BCF]/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-l from-transparent via-[#706BCF]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-[#706BCF]/40"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-flex h-12 min-w-11 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-linear-to-br from-[#5B57B8]/90 to-[#706BCF]/85 px-3 text-sm font-bold tabular-nums text-white shadow-[0_6px_20px_rgba(91,87,184,0.35)] dark:border-white/15 dark:from-[#5B57B8]/35 dark:to-[#706BCF]/15 dark:shadow-[0_0_24px_rgba(112,107,207,0.25)]"
            aria-label={`الخطوة ${stepNumber}`}
          >
            {stepNumber}
          </span>
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-(--border) bg-white/90 text-primary shadow-inner dark:border-white/12 dark:bg-white/7">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-heading sm:text-xl">{title}</h3>
          <ul className="mt-4 space-y-2.5 text-start text-sm leading-7 text-muted">
            {points.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#706BCF] shadow-[0_0_6px_rgba(112,107,207,0.65)] dark:shadow-[0_0_8px_rgba(112,107,207,0.9)]"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
