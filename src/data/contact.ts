/** بيانات التواصل الرسمية — تُستخدم في صفحة التواصل والتذييل. */
export const CONTACT = {
  phone: '0555790942',
  email: 'aleayn360@gmail.com',
  /** العنوان الكامل */
  address: 'الرياض - العارض - أسماء بنت مالك',
  commercialRegister: '1010905920',
  /** رابط واتساب (رقم سعودي بدون صفر البداية) */
  whatsappUrl: 'https://wa.me/966555790942',
  social: [
    { label: 'إنستغرام', href: 'https://instagram.com' },
    { label: 'تويتر / X', href: 'https://x.com' },
    { label: 'لينكدإن', href: 'https://linkedin.com' },
  ] as const,
} as const;
