'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { cn } from '../../lib/cn';

const PROJECT_TYPES = ['الكل', 'جهات حكومية', 'شركات', 'مستودعات', 'مجمعات تجارية'] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

type ProjectSample = {
  title: string;
  type: Exclude<ProjectType, 'الكل'>;
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
};

const projectSamples: ProjectSample[] = [
  {
    title: 'نظام مراقبة لمستودع لوجستي',
    type: 'مستودعات',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeSrc: '/lucid-origin_Ultra_realistic_futuristic_CCTV_security_camera_floating_in_a_dark_cinematic_env-0.jpg',
    afterSrc: '/hero-security-showcase.png',
  },
  {
    title: 'تغطية كاميرات لمجمع تجاري',
    type: 'مجمعات تجارية',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeSrc: '/hero-security-showcase.png',
    afterSrc: '/dome-pro-x.png',
  },
  {
    title: 'حلول أمنية لشركة متوسطة',
    type: 'شركات',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeSrc: '/nvr-secure-16ch.png',
    afterSrc: '/vision-wall-control-panel.png',
  },
  {
    title: 'مشروع قطاع حكومي',
    type: 'جهات حكومية',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeSrc: '/hero-security-showcase.png',
    afterSrc: '/dome-pro-x.png',
  },
];

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const [activeType, setActiveType] = useState<ProjectType>('الكل');

  const filtered = useMemo(
    () =>
      activeType === 'الكل'
        ? projectSamples
        : projectSamples.filter((p) => p.type === activeType),
    [activeType],
  );

  return (
    <section id="projects" className="container-shell scroll-mt-24 py-16 md:py-20">
      <SectionTitle
        eyebrow="المشاريع المنفذة"
        title="عملاؤنا ومشاريعنا"
        description="نفخر بتنفيذ مشاريع حقيقية في القطاع الحكومي والتجاري والسكني — مع توثيق بصري قبل وبعد التنفيذ."
      />

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-2"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={cn(
              'rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm',
              activeType === type
                ? 'border-primary bg-primary text-white shadow-[0_8px_24px_-8px_rgba(91,87,184,0.55)]'
                : 'border-border-soft bg-card/80 text-body hover:border-primary/30',
            )}
          >
            {type}
          </button>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {filtered.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: idx * 0.06, duration: 0.5 }}
            className="glass-card overflow-hidden p-4 sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">{project.title}</h3>
              <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/85">
                {project.type}
              </span>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-2"
              whileHover={reduceMotion ? {} : { scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-xl border border-white/15 bg-[#0a0e18]"
                whileHover={reduceMotion ? {} : { y: -2 }}
              >
                <span className="absolute start-2 top-2 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                  {project.beforeLabel}
                </span>
                <img
                  src={project.beforeSrc}
                  alt={`${project.title} — قبل`}
                  className="aspect-4/3 w-full object-cover opacity-75 grayscale-[30%]"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-xl border border-primary/30 bg-[#0a0e18] shadow-[0_0_24px_-8px_rgba(112,107,207,0.45)]"
                whileHover={reduceMotion ? {} : { y: -2 }}
              >
                <span className="absolute start-2 top-2 z-10 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                  {project.afterLabel}
                </span>
                <img
                  src={project.afterSrc}
                  alt={`${project.title} — بعد`}
                  className="aspect-4/3 w-full object-contain p-2"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
