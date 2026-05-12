'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/**
 * IO + CSS reveal (explicit opacity/transform/filter, 700ms ease-out, stagger via transitionDelay).
 * Hover on inner cards stays separate. Reduced motion: final state immediately (layout + CSS variants).
 */
export function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        className,
        'transform-gpu will-change-[transform,opacity,filter]',
        'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:blur-none',
        'transition-[opacity,transform,filter] duration-700 ease-out',
        visible ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-4 opacity-0 blur-[2px]',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
