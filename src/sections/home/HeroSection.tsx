import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/cn';

const SCROLL_RUNWAY_VH = 200;

const heroPrimaryCtaClass = cn(
  'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-300',
  'bg-gradient-to-l from-[#5B57B8] to-[#706BCF] text-white hover:opacity-95',
  'shadow-[0_6px_28px_rgba(0,0,0,0.45),0_10px_30px_rgba(112,107,207,0.35)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  /** نابض قوي = يتبع السكرول بسرعة دون “تعليق” يشبه توقف التمرير */
  const p = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 140,
    damping: reduceMotion ? 50 : 32,
    restDelta: 0.0008,
  });

  const flat = <T extends number>(a: T[], b: T[]) => (reduceMotion ? a : b);

  const heroImageY = useTransform(p, [0, 1], flat([0, 0], [0, -72]));
  const heroImageScale = useTransform(p, [0, 0.5, 1], flat([1, 1, 1], [1, 1.04, 1.08]));

  const eyebrowOpacity = useTransform(p, [0, 0.06], [1, 1]);
  const eyebrowY = useTransform(p, [0, 0.12, 0.22], flat([0, 0, 0], [0, 6, 0]));
  const titleY = useTransform(p, [0, 0.38, 0.62, 1], flat([0, 0, 0, 0], [0, -14, -28, -52]));
  const titleScale = useTransform(p, [0, 0.35, 0.72, 1], flat([1, 1, 1, 1], [0.96, 1, 1.02, 0.97]));
  const titleOpacity = useTransform(p, [0, 0.45, 0.82, 1], flat([1, 1, 1, 1], [1, 1, 0.94, 0.78]));
  const titleBlurPx = useTransform(p, [0, 0.75, 1], flat([0, 0, 0], [0, 0, 3]));
  const titleFilter = useMotionTemplate`blur(${titleBlurPx}px)`;

  const subY = useTransform(p, [0, 0.42, 1], flat([0, 0, 0], [0, -12, -36]));
  const subOpacity = useTransform(p, [0, 0.5, 0.85, 1], flat([1, 1, 1, 1], [1, 1, 0.88, 0.72]));
  const ctaY = useTransform(p, [0, 0.48, 1], flat([0, 0, 0], [0, -8, -24]));
  const ctaOpacity = useTransform(p, [0, 0.5, 0.88, 1], flat([1, 1, 1, 1], [1, 1, 0.92, 0.8]));

  const scanOpacity = useTransform(p, [0, 0.25, 0.55, 1], flat([0.04, 0.04, 0.04, 0.04], [0.02, 0.09, 0.06, 0.03]));
  const vignette = useTransform(p, [0, 0.72, 1], flat([0, 0, 0], [0, 0.22, 0.48]));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative scroll-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] text-white dark:text-white"
      style={{ minHeight: `${SCROLL_RUNWAY_VH}vh` }}
    >
      <div className="sticky top-0 flex min-h-[100dvh] flex-col overflow-hidden will-change-transform">
        <div className="pointer-events-none absolute inset-0 bg-[#0B1023]" aria-hidden />

        <motion.div
          className="pointer-events-none absolute inset-0 origin-[65%_50%] overflow-hidden md:origin-right"
          style={{ y: heroImageY, scale: heroImageScale }}
          aria-hidden
        >
          <img
            src="/hero-security-showcase.png"
            alt=""
            width={2048}
            height={1152}
            className="h-full w-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0B1023]/78 via-[#050816]/55 to-[#0B1023]/92"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_38%,rgba(3,5,14,0.82)_0%,rgba(8,11,26,0.42)_48%,transparent_72%)]"
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
          style={{
            opacity: scanOpacity,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)',
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            opacity: vignette,
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,8,20,0.85) 100%)',
          }}
        />

        <div className="container-shell relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-start px-4 pb-12 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] md:px-6 md:pb-16 md:pt-[calc(4.65rem+env(safe-area-inset-top,0px))]">
          <div className="relative flex w-full flex-col items-center text-center">
            <motion.p
              className="mb-4 inline-flex justify-center rounded-full border border-white/35 bg-[#040815]/82 px-4 py-1.5 text-xs font-bold text-white shadow-[0_4px_24px_rgba(0,0,0,0.55)] backdrop-blur-md"
              style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            >
              ذكاء اصطناعي · مراقبة رقمية · حماية مستمرة
            </motion.p>

            <motion.div
              className="w-full"
              style={{ opacity: titleOpacity, y: titleY, scale: titleScale, filter: titleFilter }}
            >
              <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.85),0_8px_40px_rgba(0,0,0,0.65),0_0_1px_rgba(0,0,0,0.9)] md:text-5xl lg:text-[3.15rem]">
              حلول أمنية وتقنية ذكية 
                <span className="mt-2 block text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.82)]">
                للمنشئات والشركات والمجمعات السكنية
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-sm leading-8 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.65)] md:text-base md:leading-8"
              style={{ opacity: subOpacity, y: subY }}
            >
              توريد وتركيب أنظمة المراقبة، الأبواب الأمنية، الأنظمة الذكية، وتقوية الشبكات بأعلى معايير الجودة والموثوقية.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <a href="#contact-cta" className={heroPrimaryCtaClass}>
                ابدأ الآن
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-[#040815]/72 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_28px_rgba(0,0,0,0.45)] transition duration-300 hover:border-white/45 hover:bg-[#050a1a]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                استكشف الخدمات
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
