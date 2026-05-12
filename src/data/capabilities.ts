import type { IconType } from 'react-icons';
import { FiActivity, FiCpu, FiEye, FiLock, FiRadio, FiSmartphone } from 'react-icons/fi';

export type CapabilityItem = {
  title: string;
  description: string;
  icon: IconType;
};

/** قدرات المنصة — عناوين عربية مع أيقونات موحّدة */
export const capabilities: CapabilityItem[] = [
  {
    title: 'رؤية موحّدة للمواقع',
    description:
      'لوحة مركزية تعرض جميع الكاميرات والتنبيهات مع تصنيف ذكي حسب الأولوية والموقع الجغرافي.',
    icon: FiEye,
  },
  {
    title: 'تحليل وذكاء اصطناعي',
    description:
      'كشف أنماط غير اعتيادية، تقليل الإنذارات الكاذبة، واقتراحات تلقائية لتحسين تغطية المراقبة.',
    icon: FiCpu,
  },
  {
    title: 'أمان الوصول والصلاحيات',
    description:
      'صلاحيات متدرجة، تسجيل دخول آمن، وسجل تدقيق لكل عملية حساسة على النظام.',
    icon: FiLock,
  },
  {
    title: 'تنبيهات فورية متعددة القنوات',
    description:
      'إشعارات للجوال والبريد وواجهات الربط API لدمج التنبيهات مع أنظمة العمليات لديك.',
    icon: FiRadio,
  },
  {
    title: 'تطبيقات ميدانية محسّنة',
    description:
      'واجهات مبنية لتعمل بسلاسة على الشبكات المتغيرة مع وضع عدم الاتصال المؤقت عند الحاجة.',
    icon: FiSmartphone,
  },
  {
    title: 'صحة النظام والأداء',
    description:
      'مؤشرات تشغيل، سعة تخزين، وجودة البث — مع تنبيهات استباقية قبل تأثر تجربة المستخدم.',
    icon: FiActivity,
  },
];
