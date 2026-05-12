import { useEffect, useState } from 'react';

const DEFAULT_SECTION = 'hero';
/** Matches sticky navbar height (no extra top padding above the bar). */
const HEADER_OFFSET = 88;

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(DEFAULT_SECTION);

  useEffect(() => {
    if (!ids.length) return;

    let rafId = 0;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const updateActiveSection = () => {
      const anchorY = HEADER_OFFSET + window.innerHeight * 0.22;
      let candidate: string | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= anchorY && rect.bottom >= anchorY) {
          candidate = section.id;
        }
      });

      if (!candidate) {
        const next = sections.find((section) => section.getBoundingClientRect().top > anchorY);
        candidate = next?.id ?? sections.at(-1)?.id ?? DEFAULT_SECTION;
      }

      const nextActive = candidate ?? DEFAULT_SECTION;
      setActiveId((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [ids]);

  return activeId;
}
