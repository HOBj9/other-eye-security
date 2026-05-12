'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { ProcessCard } from '../../components/process/ProcessCard';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { workProcessSteps } from '../../data/workProcessSteps';

function AmbientParticles({ disabled }: { disabled: boolean }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        x: ((i * 47) % 100) / 100,
        y: ((i * 61 + 19) % 100) / 100,
        s: 1.2 + (i % 4) * 0.45,
        dur: 3.8 + (i % 5) * 0.35,
        delay: i * 0.11,
      })),
    [],
  );

  if (disabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#706BCF]/25 shadow-[0_0_10px_rgba(112,107,207,0.35)] dark:bg-[#706BCF]/35 dark:shadow-[0_0_12px_rgba(112,107,207,0.45)]"
          style={{
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            width: p.s,
            height: p.s,
          }}
          animate={{
            opacity: [0.1, 0.42, 0.1],
            y: [0, -14, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Premium “How we work”: light shell + soft purple ambience in light mode; cinematic navy in dark.
 * Reveal = ScrollReveal (IO + CSS); ambient = Framer.
 */
export function WorkProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="installation-process" className="container-shell scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div
        className={[
          'relative overflow-hidden rounded-4xl border sm:border-none',
          'border-(--border) bg-linear-to-br from-[#f5f7fc] via-[#eef1fb] to-[#e6eaf8]',
          'shadow-[0_24px_70px_-28px_rgba(91,87,184,0.22)]',
          'dark:border-white/10 dark:from-[#0B1023] dark:via-[#0d1428] dark:to-[#0B1023]',
          'dark:shadow-[0_40px_100px_-36px_rgba(91,87,184,0.55)]',
        ].join(' ')}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15, 25, 48, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 25, 48, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(112,107,207,0.22),transparent_55%)] dark:bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(112,107,207,0.35),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(91,87,184,0.14),transparent_45%)] dark:bg-[radial-gradient(circle_at_85%_75%,rgba(91,87,184,0.22),transparent_45%)]"
          aria-hidden
        />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/3 h-[min(55vw,420px)] w-[min(55vw,420px)] -translate-x-1/2 rounded-full bg-[#706BCF]/12 blur-[100px] dark:bg-[#706BCF]/18"
            animate={{ opacity: [0.28, 0.48, 0.28], scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        ) : null}

        <AmbientParticles disabled={Boolean(reduceMotion)} />

        <div className="relative z-10 px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <ScrollReveal delayMs={0}>
            <header className="mx-auto max-w-3xl text-start">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-heading sm:text-3xl lg:text-[2rem]">
                خطوات العمل
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-muted sm:text-base sm:leading-8">
                من المعاينة وحتى التركيب والتشغيل، نضمن لك تجربة احترافية متكاملة بأحدث أنظمة المراقبة الذكية.
              </p>
            </header>
          </ScrollReveal>

          <div className="mx-auto mt-12 max-w-7xl sm:mt-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {workProcessSteps.map((step, index) => (
                <ScrollReveal key={step.title} delayMs={index * 70} className="h-full">
                  <ProcessCard
                    stepNumber={index + 1}
                    title={step.title}
                    points={step.points}
                    icon={step.icon}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
