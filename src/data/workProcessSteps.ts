import type { IconType } from 'react-icons';
import { FiCheckCircle, FiLayers, FiSearch, FiSettings } from 'react-icons/fi';

export type WorkProcessStep = {
  title: string;
  points: [string, string];
  icon: IconType;
};

export const workProcessSteps: WorkProcessStep[] = [
  {
    title: 'المعاينة والاستشارة',
    points: ['فهم احتياجات العميل', 'تحديد أفضل الحلول الأمنية'],
    icon: FiSearch,
  },
  {
    title: 'التخطيط والتجهيز',
    points: ['تصميم نظام المراقبة', 'اختيار الأجهزة المناسبة'],
    icon: FiLayers,
  },
  {
    title: 'التركيب والربط',
    points: ['تركيب الكاميرات والأجهزة', 'إعداد النظام باحترافية'],
    icon: FiSettings,
  },
  {
    title: 'الاختبار والتسليم',
    points: ['فحص النظام بالكامل', 'ضمان جودة التشغيل والأمان'],
    icon: FiCheckCircle,
  },
];
