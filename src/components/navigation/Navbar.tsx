import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { navItems } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { EyeThemeToggle } from '../ui/EyeThemeToggle';

const spring = { type: 'spring' as const, stiffness: 430, damping: 34, mass: 0.85 };

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(navItems.map((item) => item.href.replace('#', '')));
  const desktopNavRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0, cx: 0 });
  const logoSrc = '/العين الأخرى الرقمية2-01.png';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const updateIndicator = useCallback(() => {
    const navEl = desktopNavRef.current;
    const activeHref = `#${activeId}`;
    const activeEl = linkRefs.current[activeHref];
    if (!navEl || !activeEl) return;
    const x = activeEl.offsetLeft - navEl.scrollLeft;
    const w = Math.max(28, activeEl.offsetWidth);
    setIndicator({ x, w, cx: x + w / 2 - 5 });
  }, [activeId]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, scrolled]);

  useEffect(() => {
    const navEl = desktopNavRef.current;
    const activeEl = linkRefs.current[`#${activeId}`];
    if (!navEl || !activeEl) return;

    const onWindowResize = () => updateIndicator();
    const onNavScroll = () => updateIndicator();
    const observer = new ResizeObserver(() => updateIndicator());

    window.addEventListener('resize', onWindowResize);
    navEl.addEventListener('scroll', onNavScroll, { passive: true });
    observer.observe(navEl);
    observer.observe(activeEl);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      navEl.removeEventListener('scroll', onNavScroll);
      observer.disconnect();
    };
  }, [activeId, updateIndicator]);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const onNavigate = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-[env(safe-area-inset-top,0px)]">
      <nav
        className={`container-shell flex items-center justify-between rounded-2xl border border-white/15 px-4 transition-[background-color,box-shadow,backdrop-filter,border-color,height] duration-[400ms] ease-out dark:border-white/15 md:px-6 ${
          scrolled
            ? 'h-14 bg-white/70 shadow-md backdrop-blur-xl dark:bg-[#0B1023]/75'
            : 'h-16 bg-[#f5f7ff]/70 backdrop-blur-md dark:bg-[#0B1023]/70'
        }`}
      >
        <a
          href="#hero"
          className="flex items-center gap-3 text-base font-bold text-[#0B1023] dark:text-white"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('#hero');
          }}
        >
          <img
            src={logoSrc}
            alt="العين الأخرى الرقمية"
            className="h-10 w-auto sm:h-11"
          />
          <span className="hidden text-sm font-extrabold sm:block">العين الأخرى الرقمية</span>
        </a>

        <ul
          ref={desktopNavRef}
          className={`relative hidden max-w-[56vw] items-center gap-1 overflow-x-auto rounded-full px-1 py-1 shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex ${
            scrolled ? 'bg-white/75 dark:bg-white/10' : 'bg-white/60 backdrop-blur-xl dark:bg-white/[0.06]'
          }`}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-1 left-0 z-0"
            initial={{ x: indicator.cx, width: 10, opacity: 0.9 }}
            animate={{ x: [indicator.cx, indicator.x], width: [10, indicator.w], opacity: 1 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-full border-0 bg-linear-to-r from-[#5B57B8]/88 to-[#706BCF]/88 shadow-[0_8px_30px_-8px_rgba(120,100,255,0.35)] backdrop-blur"
              transition={spring}
            />
          </motion.div>

          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={item.href}>
                <a
                  ref={(el) => {
                    linkRefs.current[item.href] = el;
                  }}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-[transform,color] duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.03] ${
                    isActive
                      ? 'text-white'
                      : 'text-[#2b3150]/80 hover:text-[#1b2140] dark:text-white/75 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center lg:flex">
          <EyeThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <EyeThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#5B57B8]/25 text-[#1e2344] dark:border-white/20 dark:text-white"
            aria-label="فتح القائمة"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container-shell glass-card mt-3 p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.href);
                      onNavigate();
                    }}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      activeId === item.href.replace('#', '')
                        ? 'bg-[#5B57B8]/20 text-[#2c2873] dark:text-white'
                        : 'text-[#2b3150]/85 hover:bg-[#5B57B8]/10 hover:text-[#1b2140] dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
