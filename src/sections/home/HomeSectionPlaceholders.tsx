import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { FiArrowLeft, FiCamera, FiClock, FiLayers, FiMapPin, FiPhoneCall, FiShield, FiTool } from 'react-icons/fi';
import { FeaturesServiceStack } from '../../components/features/FeaturesServiceStack';
import { CONTACT } from '../../data/contact';
import { featureCards } from '../../data/featureCards';
import { cn } from '../../lib/cn';
import { SectionTitle } from '../../components/ui/SectionTitle';

function RevealCard({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

const services: { title: string; description: string; icon: IconType }[] = [
  {
    title: 'أنظمة كاميرات IP',
    description: 'تصميم وتوريد وتركيب كاميرات بدقة عالية للمواقع التجارية والسكنية.',
    icon: FiCamera,
  },
  {
    title: 'غرف مراقبة مركزية',
    description: 'تجهيز غرفة تحكم متكاملة لمتابعة الفروع والمستودعات على مدار الساعة.',
    icon: FiLayers,
  },
  {
    title: 'عقود صيانة دورية',
    description: 'زيارات فنية منتظمة وفحص استباقي لضمان استمرارية المنظومة.',
    icon: FiTool,
  },
];

type ProductPreview = { name: string; spec: string; imageSrc?: string };

/** صور المنتجات في `public/` — مطابقة الاسم المعروض للصورة الفعلية (Hikvision). */
const products: ProductPreview[] = [
  {
    name: 'كاميرا Dome Pro X',
    spec: '4K - رؤية ليلية - تتبع حركة ذكي',
    /** كاميرا دوم Hikvision — مصدر: `ChatGPT Image May 12, 2026, 01_24_11 AM.png` */
    imageSrc: '/dome-pro-x.png',
  },
  {
    name: 'NVR Secure 16CH',
    spec: '16 قناة - تخزين 8TB - وصول سحابي',
    /** مسجّل شبكة 16 قناة — مصدر: `ChatGPT Image May 12, 2026, 01_25_30 AM.png` */
    imageSrc: '/nvr-secure-16ch.png',
  },
  {
    name: 'لوحة تحكم Vision Wall',
    spec: 'عرض متعدد الشاشات - إدارة تنبيهات فورية',
    /** وحدة تحكم Vision Wall — مصدر: `ChatGPT Image May 12, 2026, 11_30_37 AM.png` */
    imageSrc: '/vision-wall-control-panel.png',
  },
];

const stats = [
  { value: '+1200', label: 'موقع تم تأمينه' },
  { value: '98.7%', label: 'نسبة رضا العملاء' },
  { value: '24/7', label: 'دعم فني مستمر' },
  { value: '+35', label: 'فني ومهندس مختص' },
];

const testimonials = [
  {
    quote:
      'من أفضل التجارب التي مررنا بها في تأمين مستودعاتنا. التنفيذ كان منظمًا والدعم الفني سريع جدًا.',
    name: 'أحمد العتيبي',
    role: 'مدير عمليات - شركة لوجستية',
  },
  {
    quote:
      'وضوح الصورة وسهولة الوصول عبر الجوال أعطتنا راحة كبيرة، خصوصًا في إدارة الفروع البعيدة.',
    name: 'سارة الحربي',
    role: 'مديرة إدارية - سلسلة متاجر',
  },
];

const faq = [
  {
    q: 'هل يمكن مراقبة الكاميرات من الهاتف؟',
    a: 'نعم، نوفر تطبيقًا آمنًا يتيح متابعة البث المباشر واستقبال التنبيهات من أي مكان.',
  },
  {
    q: 'كم يستغرق تنفيذ مشروع متوسط الحجم؟',
    a: 'عادة من 3 إلى 7 أيام عمل حسب عدد النقاط ومتطلبات البنية التحتية.',
  },
  {
    q: 'هل تشمل الخدمة الصيانة بعد التركيب؟',
    a: 'نوفر خيارات متعددة تشمل الصيانة الوقائية، الطوارئ، وتحديثات البرامج الدورية.',
  },
];

export { SectorsShowcaseSection } from './SectorsShowcaseSection';

export const ServicesSection = () => {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: reduceMotion
      ? { opacity: 0, y: 12 }
      : { opacity: 0, y: 28, rotateX: -6, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="services" className="container-shell scroll-mt-24 py-16 md:py-20">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionTitle
          eyebrow="خدماتنا"
          title="حلول أمنية متكاملة"
          description="مجموعة خدمات تجريبية قابلة للتخصيص حسب نوع نشاطك."
        />
      </motion.div>

      <motion.div
        className="mt-9 grid gap-5 perspective-[1200px] md:grid-cols-3 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      y: -8,
                      transition: { type: 'spring', stiffness: 380, damping: 26 },
                    }
              }
              whileTap={reduceMotion ? {} : { scale: 0.99 }}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft',
                'bg-card/95 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
                'transition-shadow duration-300 hover:border-primary/30 hover:shadow-[0_20px_50px_-24px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]',
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in srgb, var(--color-primary-soft) 55%, transparent) 0%, transparent 70%)',
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, transparent 45%, color-mix(in srgb, var(--color-primary-soft) 6%, transparent) 100%)',
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <motion.span
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-linear-to-br from-[color-mix(in_srgb,var(--color-primary-soft)_18%,transparent)] to-transparent text-primary shadow-inner dark:from-white/10 dark:to-transparent"
                    whileHover={reduceMotion ? {} : { scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </motion.span>
                  <span className="text-[11px] font-semibold tabular-nums text-muted-foreground opacity-70 transition-colors group-hover:text-primary/80">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-heading mt-5 text-lg font-bold leading-snug tracking-tight sm:text-xl">
                  {service.title}
                </h3>
                <p className="text-body mt-3 flex-1 text-sm leading-7 sm:text-[15px] sm:leading-8">
                  {service.description}
                </p>

                <motion.div
                  className="mt-6 h-1 overflow-hidden rounded-full bg-border/70"
                  initial={false}
                >
                  <motion.div
                    className="h-full rounded-full bg-linear-to-l from-[#5B57B8] to-[#706BCF]"
                    initial={{ width: '22%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + idx * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export const FeaturesSection = () => (
  <section id="features" className="container-shell scroll-mt-24 py-16 md:py-20">
    <motion.div
      className="glass-card relative overflow-hidden p-8 ring-1 ring-[color-mix(in_srgb,var(--border)_55%,transparent)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-white/35 before:via-transparent before:to-transparent before:opacity-100 dark:before:from-white/[0.07] dark:before:to-transparent"
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <SectionTitle
        eyebrow="المميزات"
        title="تقنيات تمنحك رؤية وسيطرة أفضل"
        description="ست بطاقات تفاعلية: اختر أي ميزة لعرض التفاصيل على الجوال، أو استعرض الطبقات على الشاشات الكبيرة."
      />
      <div className="relative z-10 mt-7">
        <FeaturesServiceStack items={featureCards} />
      </div>
    </motion.div>
  </section>
);

export const WhyChooseUsSection = () => (
  <section id="why-choose-us" className="container-shell scroll-mt-24 py-16 md:py-20">
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { icon: FiShield, title: 'اعتمادية عالية', text: 'تنفيذ بمعايير هندسية تضمن استقرار النظام على المدى الطويل.' },
        { icon: FiClock, title: 'استجابة سريعة', text: 'فريق دعم فني متوفر للاستجابة الفورية للحالات الطارئة.' },
        { icon: FiMapPin, title: 'تغطية واسعة', text: 'خدمة مشاريع في مدن متعددة عبر شبكة فنيين مختصين.' },
      ].map(({ icon: Icon, title, text }, idx) => (
        <RevealCard key={title} delay={idx * 0.08} className="h-full">
          <article className="glass-card flex h-full flex-col p-6">
            <Icon className="text-2xl text-[#706BCF]" />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
          </article>
        </RevealCard>
      ))}
    </div>
  </section>
);

export const ProductsPreviewSection = () => (
  <section id="products-preview" className="container-shell scroll-mt-24 py-16 md:py-20">
    <SectionTitle eyebrow="المنتجات" title="معاينة سريعة لأجهزتنا" />
    <div className="mt-7 grid gap-4 md:grid-cols-3">
      {products.map((product, idx) => (
        <RevealCard key={product.name} delay={idx * 0.08}>
          <article className="glass-card p-6">
            {product.imageSrc ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-white/15 bg-[#0a0e18] dark:bg-[#060910]">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="aspect-4/3 w-full object-contain object-center p-3 sm:p-4"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="mb-4 rounded-lg border border-dashed border-white/25 bg-white/5 py-8 text-center text-xs text-white/60">
                صورة المنتج
              </div>
            )}
            <h3 className="text-base font-bold">{product.name}</h3>
            <p className="mt-2 text-sm text-white/70">{product.spec}</p>
          </article>
        </RevealCard>
      ))}
    </div>
  </section>
);

export const StatisticsSection = () => (
  <section id="statistics" className="container-shell scroll-mt-24 py-16 md:py-20">
    <div className="glass-card p-8">
      <SectionTitle eyebrow="بالأرقام" title="نتائج تعكس جودة التنفيذ" centered />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((item, idx) => (
          <RevealCard key={item.label} delay={idx * 0.06}>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-center">
              <p className="text-2xl font-extrabold text-white">{item.value}</p>
              <p className="mt-2 text-xs text-white/70">{item.label}</p>
            </div>
          </RevealCard>
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialsSection = () => (
  <section id="testimonials" className="container-shell scroll-mt-24 py-16 md:py-20">
    <SectionTitle eyebrow="آراء العملاء" title="ماذا يقول شركاؤنا" />
    <div className="mt-7 grid gap-4 md:grid-cols-2 md:items-stretch">
      {testimonials.map((item, idx) => (
        <RevealCard key={item.name} delay={idx * 0.09} className="h-full min-h-0">
          <article className="glass-card flex h-full flex-col p-6 md:p-8">
            <blockquote className="min-h-0 flex-1">
              <p className="text-sm leading-7 text-white/80">"{item.quote}"</p>
            </blockquote>
            <footer className="mt-6 shrink-0 border-t border-white/10 pt-4">
              <p className="font-bold">{item.name}</p>
              <p className="mt-1 text-xs text-white/60">{item.role}</p>
            </footer>
          </article>
        </RevealCard>
      ))}
    </div>
  </section>
);

export const FaqPreviewSection = () => (
  <section id="faq-preview" className="container-shell scroll-mt-24 py-16 md:py-20">
    <SectionTitle eyebrow="FAQ" title="أسئلة شائعة قبل البدء" />
    <div className="mt-7 space-y-3">
      {faq.map((item, idx) => (
        <RevealCard key={item.q} delay={idx * 0.07}>
          <article className="glass-card p-5">
            <h3 className="text-base font-bold">{item.q}</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">{item.a}</p>
          </article>
        </RevealCard>
      ))}
    </div>
  </section>
);

export const ContactCtaSection = () => (
  <section id="contact-cta" className="container-shell scroll-mt-24 py-16 md:py-20">
    <div className="glass-card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-bold text-[#b8b4ff]">جاهز للانطلاق؟</p>
        <h3 className="mt-2 text-2xl font-extrabold">احصل على معاينة أمنية لموقعك خلال 48 ساعة</h3>
        <p className="mt-3 text-sm text-white/70">هذا نص تجريبي لدعوة اتخاذ الإجراء ويمكن تخصيصه لاحقًا.</p>
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B57B8] to-[#706BCF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(112,107,207,0.35)] transition duration-300 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        تواصل الآن
        <FiArrowLeft />
      </Link>
    </div>
  </section>
);

export const FooterSection = () => (
  <footer id="footer-section" className="container-shell pb-10 pt-4">
    <div className="glass-card p-7">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-extrabold">العين الأخرى الرقمية</h4>
          <p className="mt-3 text-sm leading-7 text-white/70">
            شركة متخصصة في كاميرات المراقبة، أنظمة CCTV، والحلول الأمنية الذكية.
          </p>
        </div>
        <div>
          <h4 className="font-bold">روابط سريعة</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><a href="#services">الخدمات</a></li>
            <li><a href="#features">المميزات</a></li>
            <li><a href="#faq-preview">الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">بيانات التواصل</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <FiPhoneCall aria-hidden />
              <a href={`tel:+966${CONTACT.phone.replace(/^0/, '')}`} className="hover:text-white">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li>{CONTACT.address}</li>
            <li className="text-white/60">س.ت: {CONTACT.commercialRegister}</li>
          </ul>
        </div>
      </div>
      <p className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/60">
        جميع الحقوق محفوظة - العين الأخرى الرقمية 2026
      </p>
    </div>
  </footer>
);
