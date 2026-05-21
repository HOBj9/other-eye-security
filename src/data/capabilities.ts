import type { IconType } from 'react-icons';
import { FiCamera, FiCpu, FiLock, FiShield, FiTrendingUp, FiZap } from 'react-icons/fi';

export type CapabilityItem = {
  title: string;
  description: string;
  icon: IconType;
};

/** قدرات المنصة — بطاقات العرض الرئيسية */
export const capabilities: CapabilityItem[] = [
  {
    title: 'حلول أمنية وتقنية تُنفذ باحترافية وتعمل بثقة.',
    description: '',
    icon: FiShield,
  },
  {
    title: 'من الكاميرات إلى الأنظمة الذكية… كل ما تحتاجه منشأتك في مكان واحد.',
    description: '',
    icon: FiCamera,
  },
  {
    title: 'أمان أعلى، إدارة أسهل، وتقنية تواكب احتياج أعمالك.',
    description: '',
    icon: FiLock,
  },
  {
    title: 'نُحول منشأتك إلى بيئة أكثر ذكاءً وأمانًا واستقرارًا.',
    description: '',
    icon: FiCpu,
  },
  {
    title: 'تنفيذ احترافي، دعم فني سريع، وجودة تعتمد عليها.',
    description: '',
    icon: FiZap,
  },
  {
    title: 'لأن نجاح أعمالك يبدأ من بنية تقنية قوية وآمنة.',
    description: '',
    icon: FiTrendingUp,
  },
];
