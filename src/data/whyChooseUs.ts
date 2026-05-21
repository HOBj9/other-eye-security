import type { IconType } from 'react-icons';
import { FiAward, FiBriefcase, FiCheckCircle, FiClock, FiShield, FiUsers } from 'react-icons/fi';

export type WhyChooseUsItem = {
  title: string;
  icon: IconType;
};

export const whyChooseUsItems: WhyChooseUsItem[] = [
  { title: 'تنفيذ احترافي', icon: FiCheckCircle },
  { title: 'ضمان على الأعمال', icon: FiShield },
  { title: 'دعم فني سريع', icon: FiClock },
  { title: 'منتجات عالية الجودة', icon: FiAward },
  { title: 'فريق متخصص', icon: FiUsers },
  { title: 'حلول مناسبة للشركات والمنازل', icon: FiBriefcase },
];
