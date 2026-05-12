'use client';

import { useSyncExternalStore } from 'react';
import type { IconType } from 'react-icons';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { capabilities } from '../../data/capabilities';
import { cn } from '../../lib/cn';

export type PlatformCapabilityItem = {
  title: string;
  description: string;
  icon: IconType;
};

function subscribeDir(callback: () => void) {
  const el = document.documentElement;
  const mo = new MutationObserver(callback);
  mo.observe(el, { attributes: true, attributeFilter: ['dir'] });
  return () => mo.disconnect();
}

function getDirIsRtlSnapshot() {
  return document.documentElement.getAttribute('dir') === 'rtl';
}

function getDirIsRtlServerSnapshot() {
  return true;
}

function useRtl() {
  return useSyncExternalStore(subscribeDir, getDirIsRtlSnapshot, getDirIsRtlServerSnapshot);
}

/** Reveal uses IO + CSS; hover uses card transition classes. */
export function PlatformCapabilitiesSection({
  items = capabilities,
  title = 'قدرات أساسية لمراقبة أذكى وأكثر أمانًا',
  description = 'بنية تقنية موحّدة تجمع البث، التحليل، والتنبيهات في تجربة واحدة — قابلة للتوسع مع نمو أعمالك.',
}: {
  items?: PlatformCapabilityItem[];
  title?: string;
  description?: string;
}) {
  const isRtl = useRtl();

  return (
    <section
      id="overview"
      className="container-shell relative scroll-mt-24 py-14 sm:py-20 lg:py-28"
    >
      <ScrollReveal
        className={cn(
          'mx-auto -mt-4 mb-12 max-w-3xl sm:-mt-2 sm:mb-16 lg:mb-24',
          isRtl ? 'text-right' : 'text-left',
        )}
      >
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
          {description}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-8 max-w-5xl sm:mt-12">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delayMs={index * 70} className="h-full">
                <article
                  className={cn(
                    'h-full rounded-2xl border border-border/70 bg-card/95 shadow-sm transition-all duration-300',
                    'hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_12px_30px_-18px_hsl(var(--foreground)/0.35)]',
                    'motion-reduce:hover:translate-y-0',
                    'p-6',
                  )}
                >
                  <div className="space-y-4 pb-3">
                    <div
                      className={cn(
                        'mb-3 flex',
                        isRtl ? 'justify-end' : 'justify-start',
                      )}
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-white/5 -gradient-to-b from-background to-muted/60">
                        <Icon className="h-5 w-5 text-primary" aria-hidden />
                      </span>
                    </div>
                    <h3
                      className={cn(
                        'text-lg font-semibold tracking-tight text-foreground',
                        isRtl ? 'text-right' : 'text-left',
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      'text-sm leading-7 text-muted-foreground',
                      isRtl ? 'text-right' : 'text-left',
                    )}
                  >
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
