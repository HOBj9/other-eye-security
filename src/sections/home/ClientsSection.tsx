'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { partners } from '../../data/clients';

export function ClientsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="clients" className="container-shell scroll-mt-24 py-16 md:py-20">
      <SectionTitle
        eyebrow="عملاؤنا"
        title="شركاء نعتز بهم"
        description="خدمنا العديد من العملاء في القطاع الحكومي والتجاري والسكني — نفذنا مشاريع بمعايير جودة عالية ومسؤولية كاملة."
        centered
      />

      <motion.div
        className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
        }}
      >
        {partners.map((partner) => (
          <motion.div
            key={partner.name}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-8 text-center transition hover:border-primary/35 hover:bg-white/10"
          >
            <motion.div
              className="flex h-24 w-full items-center justify-center sm:h-28"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={partner.logoSrc}
                alt={partner.logoAlt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </motion.div>
            <p className="mt-4 text-sm font-semibold leading-6 text-white/85">{partner.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
