'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

/** حركة عمودية خفيفة فريدة لكل قطاع (حساب محدد من المفتاح + الفهرس) */
function getVerticalDrift(seed: string, index: number) {
  let h = index * 31;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i) * (i + 1)) % 503;
  const up = 3 + (h % 5);
  const down = 2 + ((h >> 3) % 4);
  const duration = 2.9 + (h % 7) * 0.38;
  const delay = ((h * 17) % 100) / 100;
  return { up, down, duration, delay };
}

/** قطاعات — هوية المنصة بدون كارد أو خلفية منفصلة. */

const BRAND_SOFT = 'var(--color-primary-soft)';
const WINDOW = '#e8e6ff';

/** تعبئة المباني من طبقات الصفحة */
const FILL = 'color-mix(in srgb, var(--card) 94%, var(--color-primary) 6%)';
const FILL_DEEP = 'color-mix(in srgb, var(--heading) 22%, var(--card))';

type SectorDef = {
  label: string;
  key: string;
};

const SECTORS: SectorDef[] = [
  { label: 'المصانع', key: 'factory' },
  { label: 'المستودعات', key: 'warehouse' },
  { label: 'المكاتب والشركات', key: 'tower' },
  { label: 'الفلل والمنازل', key: 'villa' },
  { label: 'المجمعات السكنية', key: 'complex' },
  { label: 'المحلات التجارية', key: 'store' },
];

function SensorDot({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={cn(
        'pointer-events-none absolute z-10 h-2 w-2 rounded-full shadow-[0_0_14px_var(--color-glow)]',
        className,
      )}
      style={{
        background: `radial-gradient(circle at 30% 30%, #f0eeff 0%, rgb(112 107 207) 100%)`,
      }}
      animate={
        reduce
          ? {}
          : {
              opacity: [0.55, 1, 0.55],
              scale: [1, 1.25, 1],
            }
      }
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden
    />
  );
}

const SVG_COMMON = {
  stroke: BRAND_SOFT,
  fill: FILL,
  deep: FILL_DEEP,
  window: WINDOW,
  /** خط موحّد يقلّل ازدواج الحدود عند التكبير */
  sw: 1.35,
  swThin: 1.05,
} as const;

function SectorIllustration({
  sectorKey,
  className,
}: {
  sectorKey: string;
  className?: string;
}) {
  const { stroke, fill, deep, window: w, sw, swThin } = SVG_COMMON;

  switch (sectorKey) {
    case 'factory':
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          {/* هيكل رئيسي: أربعة أسنان منشار عريضة + قاعدة مستقرة */}
          <path
            d="M16 100 V58 L24 32 L32 58 L40 32 L48 58 L56 32 L64 58 L72 32 L80 58 V100 H16 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* مدخنة مع غطاء */}
          <rect x="76" y="26" width="10" height="34" rx="2" fill={fill} stroke={stroke} strokeWidth={swThin} />
          <rect x="74" y="18" width="14" height="9" rx="2.5" fill={fill} stroke={stroke} strokeWidth={swThin} />
          <rect x="78" y="14" width="6" height="5" rx="1" fill={stroke} opacity={0.35} />
          {/* نوافذ علوية متناغمة */}
          <rect x="26" y="64" width="11" height="11" rx="2.5" fill={w} opacity={0.92} />
          <rect x="44.5" y="64" width="11" height="11" rx="2.5" fill={w} opacity={0.92} />
          <rect x="63" y="64" width="11" height="11" rx="2.5" fill={w} opacity={0.88} />
          {/* باب / رول صناعي واسع */}
          <rect x="34" y="78" width="32" height="20" rx="2.5" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <path
            d="M38 78 H62"
            fill="none"
            stroke={stroke}
            strokeWidth={0.9}
            opacity={0.4}
          />
        </svg>
      );
    case 'warehouse':
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <path d="M8 40 L50 18 L92 40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x="8" y="40" width="84" height="52" rx="2.5" fill={fill} stroke={stroke} strokeWidth={sw} />
          {/* ثلاث بوابات بفواصل واضحة — بدون تلاصق حدود */}
          <rect x="14" y="54" width="22" height="30" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="39" y="54" width="22" height="30" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="64" y="54" width="22" height="30" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="20" y="62" width="10" height="7" rx="1" fill={w} opacity={0.85} />
        </svg>
      );
    case 'tower':
      /* برج: أربع صفوف نوافذ فقط ثم باب — لا تداخل مع الصف السفلي */
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <rect x="28" y="10" width="44" height="88" rx="3" fill={fill} stroke={stroke} strokeWidth={sw} />
          {[0, 1, 2, 3].map((row) =>
            [0, 1].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={36 + col * 18}
                y={22 + row * 13}
                width="10"
                height="8"
                rx="1.5"
                fill={w}
                opacity={0.62 + (row % 2) * 0.18}
              />
            )),
          )}
          <rect x="36" y="78" width="28" height="16" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
        </svg>
      );
    case 'villa':
      /* فيلا: سقف منفصل عن الجسم — لا تكرار للتعبئة */
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <path d="M50 12 L14 40 H86 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x="22" y="40" width="56" height="52" rx="2" fill={fill} stroke={stroke} strokeWidth={sw} />
          <rect x="38" y="58" width="24" height="26" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="28" y="48" width="10" height="9" rx="1.5" fill={w} opacity={0.88} />
          <rect x="60" y="48" width="10" height="9" rx="1.5" fill={w} opacity={0.8} />
        </svg>
      );
    case 'complex':
      /* مجمع: ثلاث كتل بمسافات أفقية ثابتة */
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <path d="M6 56 L18 44 L30 56 V92 H6 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M38 48 L52 30 L66 48 V92 H38 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M74 54 L86 42 L98 54 V92 H74 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x="12" y="64" width="8" height="8" rx="1.5" fill={w} opacity={0.82} />
          <rect x="46" y="56" width="8" height="8" rx="1.5" fill={w} opacity={0.78} />
          <rect x="84" y="62" width="8" height="8" rx="1.5" fill={w} opacity={0.74} />
        </svg>
      );
    case 'store':
      return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden>
          <rect x="10" y="42" width="80" height="50" rx="2.5" fill={fill} stroke={stroke} strokeWidth={sw} />
          <path d="M10 42 L50 22 L90 42" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          {/* واجهة زجاجية تحت المظلّة فقط */}
          <rect
            x="18"
            y="48"
            width="64"
            height="18"
            rx="2"
            fill="color-mix(in srgb, var(--color-primary-soft) 12%, transparent)"
            stroke={stroke}
            strokeWidth={swThin}
          />
          <rect x="26" y="74" width="20" height="14" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="54" y="74" width="20" height="14" rx="2" fill={deep} stroke={stroke} strokeWidth={swThin} />
          <rect x="34" y="54" width="32" height="8" rx="1.5" fill={w} opacity={0.5} />
        </svg>
      );
    default:
      return null;
  }
}

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.075, delayChildren: 0.12 },
  },
};

export function SectorsShowcaseSection() {
  const reduce = useReducedMotion();

  const cardVariants = reduce
    ? {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: 'easeOut' as const },
        },
      }
    : {
        hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="sectors-we-serve"
      className="container-shell scroll-mt-24 py-16 md:py-20 lg:py-24"
      aria-labelledby="sectors-showcase-heading"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium tracking-wide text-primary">
          القطاعات التي نخدمها
        </p>
        <h2
          id="sectors-showcase-heading"
          className="text-heading mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
        >
          <span className="text-heading">مدينة كاملة </span>
          <span className="bg-linear-to-l from-[color-mix(in_srgb,var(--color-primary-soft)_75%,white)] via-[#706BCF] to-[#5B57B8] bg-clip-text text-transparent">
            تحت حمايتنا
          </span>
        </h2>
        <p className="text-body mt-5 text-sm leading-8 sm:text-base sm:leading-8">
          من المصنع إلى المتجر، ومن المستودع إلى الفلّة — نُؤمّن كل نوع من المنشآت بحلول مصمَّمة لطبيعتها وحجمها وحركتها.
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto mt-12 max-w-6xl lg:mt-16"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="pointer-events-none absolute -bottom-6 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-12">
          {SECTORS.map((sector, index) => {
            const drift = getVerticalDrift(sector.key, index);
            return (
            <motion.div key={sector.key} variants={cardVariants} className="group relative flex flex-col items-center text-center">
              <motion.div
                className="relative mb-3 inline-flex max-w-[min(100%,220px)] rounded-full border border-border-soft bg-card px-3 py-1.5 text-[11px] font-semibold text-heading shadow-sm sm:text-xs"
                whileHover={reduce ? {} : { y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              >
                {sector.label}
              </motion.div>

              <div className="relative flex h-[120px] w-full max-w-[140px] items-end justify-center sm:h-[132px] sm:max-w-[160px]">
                <motion.div
                  className="relative will-change-transform drop-shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary-soft)_35%,transparent)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_22px_color-mix(in_srgb,var(--color-primary-soft)_50%,transparent)]"
                  animate={
                    reduce
                      ? undefined
                      : {
                          y: [0, -drift.up, 0, drift.down, 0],
                        }
                  }
                  transition={{
                    duration: drift.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: drift.delay,
                  }}
                  whileHover={
                    reduce
                      ? {}
                      : {
                          y: 0,
                          scale: 1.04,
                          transition: {
                            y: { duration: 0.22, ease: 'easeOut' },
                            scale: { type: 'spring', stiffness: 420, damping: 26 },
                          },
                        }
                  }
                >
                  <SectorIllustration sectorKey={sector.key} className="h-full w-full max-h-[120px] min-h-[88px]" />
                  {/* نقطة واحدة في زاوية آمنة لتجنب التقاطع مع السقف/الخطوط */}
                  <SensorDot className="right-1 top-2" delay={index * 0.12} />
                </motion.div>

                <div
                  className="pointer-events-none absolute inset-x-0 -bottom-2 h-8 bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,color-mix(in_srgb,var(--color-primary-soft)_14%,transparent),transparent_72%)] opacity-80 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-muted mt-10 text-center text-[11px] font-medium uppercase tracking-[0.28em] sm:mt-12"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          مباشر · تحت · المراقبة
        </motion.p>
      </motion.div>
    </section>
  );
}
