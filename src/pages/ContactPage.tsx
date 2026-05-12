import { MainLayout } from '../layouts/MainLayout';

export function ContactPage() {
  return (
    <MainLayout>
      <section className="container-shell py-20">
        <div className="glass-card p-8 md:p-10">
          <h1 className="text-3xl font-bold">تواصل معنا</h1>
          <p className="mt-4 text-white/75">
            يمكنك التواصل معنا عبر البيانات التالية. جميع المعلومات أدناه تجريبية لغرض العرض.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-lg font-bold">بيانات مباشرة</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>الهاتف: 0000 000 050</li>
                <li>البريد: contact@example.com</li>
                <li>العنوان: الرياض - حي الأعمال</li>
                <li>ساعات العمل: 9 ص - 6 م</li>
              </ul>
            </div>
            <form className="rounded-xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-lg font-bold">نموذج طلب سريع</h2>
              <div className="mt-4 grid gap-3">
                <input className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none" placeholder="الاسم" />
                <input className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none" placeholder="رقم الجوال" />
                <textarea className="min-h-28 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none" placeholder="تفاصيل الطلب" />
                <button type="button" className="rounded-lg bg-linear-to-l from-[#5B57B8] to-[#706BCF] px-4 py-2 text-sm font-bold shadow-[0_10px_30px_rgba(112,107,207,0.35)] hover:opacity-95 text-white">
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
