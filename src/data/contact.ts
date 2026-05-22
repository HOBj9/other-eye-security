export type SocialPlatform = 'x' | 'facebook' | 'instagram' | 'snapchat';

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
    { platform: 'x', href: 'https://x.com/AleaynCamera' },
    { platform: 'facebook', href: 'https://www.facebook.com/profile.php?id=61589332633935' },
    { platform: 'instagram', href: 'https://www.instagram.com/aleayn360/' },
    { platform: 'snapchat', href: 'https://snapchat.com/t/e5ZQvTJe' },
  ] as const,
} as const;
