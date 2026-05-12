import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { FeatureCardItem } from '../../data/featureCards';
import { cn } from '../../lib/cn';
import { FeatureCarouselBackdrop } from './FeatureCarouselBackdrop';
import { getSignedDistance } from './getSignedDistance';
import { ServiceCardContent } from './ServiceCardContent';

/** Interval between automatic slides (also resets after manual navigation). */
const FEATURE_CAROUSEL_AUTO_MS = 5200;

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
  return false;
}

function cardWidthForLevel(level: number): string {
  if (level === 0) return 'clamp(260px, 40vw, 420px)';
  if (level === 1) return 'clamp(220px, 32vw, 340px)';
  return 'clamp(205px, 28vw, 300px)';
}

const DEFAULT_ACCENTS = ['#5B57B8', '#706BCF', '#8B84E8', '#a39dff', '#7c77d4', '#9b94e8'];

/**
 * Multi-layer brand gradients: per-card accent + primary/soft veils → neutral base.
 * First layer = top (corner glow); last = bottom (main wash). Tokens: globals `--feature-card-*`.
 */
function featureCardGradient(accentColor: string): string {
  const accentStrong = `color-mix(in srgb, ${accentColor} 34%, transparent)`;
  const accentMid = `color-mix(in srgb, ${accentColor} 22%, transparent)`;
  const cornerGlow = `radial-gradient(ellipse 90% 75% at 100% 0%, ${accentStrong}, transparent 58%)`;
  const diagonalBrand = `linear-gradient(298deg, transparent 18%, var(--feature-card-brand-soft-veil) 52%, var(--feature-card-brand-primary-veil) 78%, transparent 100%)`;
  const baseWash = `linear-gradient(148deg, ${accentMid} 0%, var(--feature-card-brand-primary-veil) 18%, var(--feature-card-base-mid) 46%, var(--feature-card-brand-soft-veil) 62%, var(--feature-card-base-end) 100%)`;
  return [cornerGlow, diagonalBrand, baseWash].join(', ');
}

/** Front / mobile: light wash on accent. */
const FEATURE_CARD_TEXT_SCRIM =
  'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-white/72 from-[8%] via-white/38 via-[52%] to-white/14 dark:from-zinc-950/88 dark:via-zinc-950/52 dark:to-zinc-950/22';

/** Desktop stack back: denser base so underlying card text does not show through the face. */
const DESKTOP_STACK_BACK_FACE =
  'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-white/92 from-[6%] via-white/78 via-[45%] to-white/58 dark:from-zinc-950/96 dark:via-zinc-950/88 dark:to-zinc-950/74';

function desktopInactiveDimOpacity(level: number): number {
  if (level <= 0) return 0;
  if (level === 1) return 0.55;
  if (level === 2) return 0.72;
  return 0.82;
}

function desktopStackCardOpacity(level: number): number {
  if (level === 0) return 1;
  if (level === 1) return 0.94;
  if (level === 2) return 0.88;
  return 0.82;
}

type FeaturesServiceStackProps = {
  items: FeatureCardItem[];
  accentColors?: string[];
};

export function FeaturesServiceStack({ items, accentColors }: FeaturesServiceStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isRtl = useSyncExternalStore(subscribeDir, getDirIsRtlSnapshot, getDirIsRtlServerSnapshot);
  const total = items.length;
  const accents = accentColors?.length
    ? items.map((_, i) => accentColors[i % accentColors.length])
    : items.map((_, i) => DEFAULT_ACCENTS[i % DEFAULT_ACCENTS.length]);

  const goNext = () => setActiveIndex((i) => (i + 1) % total);
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total <= 1 || reduceMotion) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setActiveIndex((i) => (i + 1) % total);
    }, FEATURE_CAROUSEL_AUTO_MS);
    return () => window.clearInterval(id);
  }, [activeIndex, total, reduceMotion]);

  const PrevIcon = isRtl ? FiChevronRight : FiChevronLeft;
  const NextIcon = isRtl ? FiChevronLeft : FiChevronRight;

  const activeVisualSrc = items[activeIndex]?.productImageSrc;

  return (
    <div
      className="relative isolate overflow-hidden rounded-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="عرض مميزات المنصة"
    >
      <FeatureCarouselBackdrop
        imageSrc={activeVisualSrc}
        activeIndex={activeIndex}
        reducedMotion={reduceMotion}
      />

      <div className="relative z-10 space-y-4 lg:hidden">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const accentColor = accents[index] ?? DEFAULT_ACCENTS[0];
          const dimOpacity = isActive ? 0 : 0.44;
          return (
            <motion.button
              key={item.title}
              type="button"
              initial={false}
              onClick={() => setActiveIndex(index)}
              animate={{ opacity: isActive ? 1 : 0.92, scale: isActive ? 1 : 0.985 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left shadow-[0_18px_38px_-28px_rgba(15,23,42,0.26)] outline-none dark:shadow-[0_18px_38px_-28px_rgba(0,0,0,0.8)] sm:p-6 ${
                isActive
                  ? 'border-(--feature-card-border-active) shadow-[0_18px_38px_-28px_rgba(15,23,42,0.26),0_0_36px_var(--feature-card-glow)] dark:shadow-[0_18px_38px_-28px_rgba(0,0,0,0.8),0_0_42px_var(--feature-card-glow)]'
                  : 'border-border-soft hover:border-(--feature-card-border-active)'
              }`}
              aria-pressed={isActive}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-(--feature-card-solid)"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ backgroundImage: featureCardGradient(accentColor) }}
                aria-hidden
              />
              <div className={FEATURE_CARD_TEXT_SCRIM} aria-hidden />
              <motion.div
                className="pointer-events-none absolute inset-0 z-2"
                aria-hidden
                initial={false}
                animate={{ opacity: dimOpacity }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: 'var(--feature-card-dim)' }}
              />
              <motion.div
                className="absolute right-4 top-4 z-3 h-9 w-9 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_38%,transparent)] bg-white/45 dark:border-white/22 dark:bg-white/8 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
                animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1 : 0.92 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute inset-1 rounded-full border border-[color-mix(in_srgb,var(--color-primary-soft)_45%,transparent)] dark:border-white/25"
                  animate={{ rotate: isActive ? 360 : 0 }}
                  transition={
                    isActive
                      ? { duration: 6, ease: 'linear', repeat: Infinity }
                      : { duration: 0.35, ease: 'easeOut' }
                  }
                />
              </motion.div>
              <ServiceCardContent
                title={item.title}
                summary={item.summary}
                detail={item.detail}
                index={index}
                isActive={isActive}
                compact
                productImageSrc={item.productImageSrc}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto hidden h-[470px] w-full max-w-4xl overflow-hidden lg:block lg:h-[540px]">
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="الميزة السابقة"
              className={cn(
                'absolute top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isRtl ? 'right-2 sm:right-4' : 'left-2 sm:left-4',
              )}
            >
              <PrevIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="الميزة التالية"
              className={cn(
                'absolute top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isRtl ? 'left-2 sm:left-4' : 'right-2 sm:right-4',
              )}
            >
              <NextIcon className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
        {items.map((item, index) => {
          const distance = getSignedDistance(index, activeIndex, total);
          const level = Math.min(Math.abs(distance), 3);
          const isActive = distance === 0;
          const direction = distance === 0 ? 0 : Math.sign(distance);
          const xOffset =
            direction *
            (level === 1 ? 240 : level === 2 ? 315 : level >= 3 ? 360 : 0);
          const yOffset = level === 0 ? 0 : level === 1 ? 18 : level === 2 ? 28 : 36;
          const scale = level === 0 ? 1 : level === 1 ? 0.93 : level === 2 ? 0.88 : 0.84;
          const stackOpacity = desktopStackCardOpacity(level);
          const dimOpacity = isActive ? 0 : desktopInactiveDimOpacity(level);
          const cardWidth = cardWidthForLevel(level);
          const zIndex = 40 - level;
          const accentColor = accents[index] ?? DEFAULT_ACCENTS[0];
          const tx = (isRtl ? -1 : 1) * xOffset;

          return (
            <div
              key={item.title}
              className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2"
              style={{ width: cardWidth, zIndex }}
            >
              <motion.button
                type="button"
                initial={false}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: tx,
                  y: yOffset,
                  scale,
                  opacity: stackOpacity,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto relative h-full w-full overflow-hidden rounded-2xl border p-6 text-left shadow-[0_22px_46px_-30px_rgba(15,23,42,0.24)] outline-none dark:shadow-[0_22px_46px_-30px_rgba(0,0,0,0.85)] sm:p-7 ${
                  isActive
                    ? 'border-(--feature-card-border-active) shadow-[0_22px_46px_-30px_rgba(15,23,42,0.24),0_0_44px_var(--feature-card-glow)] dark:shadow-[0_22px_46px_-30px_rgba(0,0,0,0.85),0_0_48px_var(--feature-card-glow)]'
                    : 'border-border-soft hover:border-(--feature-card-border-active)'
                } ${!isActive ? 'ring-1 ring-black/6 dark:ring-white/6' : ''}`}
                style={{ transformOrigin: 'center center' }}
                aria-pressed={isActive}
              >
                <div
                  className="pointer-events-none absolute inset-0 z-0 bg-(--feature-card-solid)"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{ backgroundImage: featureCardGradient(accentColor) }}
                  aria-hidden
                />
                <div
                  className={isActive ? FEATURE_CARD_TEXT_SCRIM : DESKTOP_STACK_BACK_FACE}
                  aria-hidden
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 z-2"
                  aria-hidden
                  initial={false}
                  animate={{ opacity: dimOpacity }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: 'var(--feature-card-dim)' }}
                />
                <motion.div
                  className="absolute right-5 top-5 z-3 h-10 w-10 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_38%,transparent)] bg-white/45 dark:border-white/22 dark:bg-white/8"
                  animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1 : 0.92 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-1 rounded-full border border-[color-mix(in_srgb,var(--color-primary-soft)_45%,transparent)] dark:border-white/25"
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={
                      isActive
                        ? { duration: 6, ease: 'linear', repeat: Infinity }
                        : { duration: 0.4, ease: 'easeOut' }
                    }
                  />
                </motion.div>
                <ServiceCardContent
                  title={item.title}
                  summary={item.summary}
                  detail={item.detail}
                  index={index}
                  isActive={isActive}
                  stackPeek={!isActive}
                  productImageSrc={item.productImageSrc}
                />
              </motion.button>
            </div>
          );
        })}
      </div>

      {total > 1 ? (
        <div
          className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:mt-8"
          aria-label="اختيار الميزة"
        >
          {items.map((item, index) => (
            <button
              key={`dot-${item.title}`}
              type="button"
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-label={`الميزة ${index + 1}: ${item.title}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-2 rounded-full transition-[width,background-color] duration-300',
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/35 hover:bg-muted-foreground/55',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
