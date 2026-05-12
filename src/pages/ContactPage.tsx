import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { CONTACT } from '../data/contact';

export function ContactPage() {
  const telHref = `tel:+966${CONTACT.phone.replace(/^0/, '')}`;

  return (
    <MainLayout>
      <section className="container-shell scroll-mt-24 py-16 md:py-20">
        <div className="glass-card mx-auto w-full max-w-xl p-8 text-center md:max-w-2xl md:p-10">
          <h1 className="text-heading text-3xl font-bold tracking-tight">تواصل معنا</h1>
          <p className="text-body mx-auto mt-4 max-w-md text-base leading-8 md:max-w-lg">
            نرحب باستفساراتكم وطلبات المعاينة. يمكنكم التواصل معنا مباشرة عبر الهاتف أو البريد، أو زيارة عنواننا
            في الرياض.
          </p>

          <div className="mx-auto mt-10 w-full max-w-md text-center">
            <h2 className="text-heading text-lg font-bold">بيانات التواصل</h2>
            <ul className="mt-4 space-y-4 text-start text-sm sm:text-base">
              <li className="flex items-start justify-center gap-3 rounded-xl border border-border-soft bg-card/80 p-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-soft bg-linear-to-br from-[color-mix(in_srgb,var(--color-primary-soft)_15%,transparent)] to-transparent text-primary">
                  <FiPhone className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-muted text-xs font-medium uppercase tracking-wide">الهاتف</p>
                  <a href={telHref} className="text-heading mt-1 block font-semibold hover:text-primary">
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start justify-center gap-3 rounded-xl border border-border-soft bg-card/80 p-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-soft bg-linear-to-br from-[color-mix(in_srgb,var(--color-primary-soft)_15%,transparent)] to-transparent text-primary">
                  <FiMail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-muted text-xs font-medium uppercase tracking-wide">البريد الإلكتروني</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-heading mt-1 block break-all font-semibold hover:text-primary"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start justify-center gap-3 rounded-xl border border-border-soft bg-card/80 p-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-soft bg-linear-to-br from-[color-mix(in_srgb,var(--color-primary-soft)_15%,transparent)] to-transparent text-primary">
                  <FiMapPin className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-muted text-xs font-medium uppercase tracking-wide">الموقع</p>
                  <p className="text-heading mt-1 font-semibold leading-7">{CONTACT.address}</p>
                </div>
              </li>
              <li className="rounded-xl border border-border-soft bg-card/80 p-4 text-center">
                <p className="text-muted text-xs font-medium uppercase tracking-wide">السجل التجاري</p>
                <p className="text-heading mt-1 font-mono text-lg font-semibold tracking-wide">
                  {CONTACT.commercialRegister}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
