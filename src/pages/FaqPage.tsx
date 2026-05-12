import { MainLayout } from '../layouts/MainLayout';

export function FaqPage() {
  return (
    <MainLayout>
      <section className="container-shell py-20">
        <div className="glass-card p-8 md:p-10">
          <h1 className="text-3xl font-bold">الأسئلة الشائعة</h1>
          <div className="mt-8 space-y-3">
            {[
              {
                q: 'هل تدعمون المشاريع الصغيرة؟',
                a: 'نعم، نوفر خططًا مناسبة للمنازل والمحلات الصغيرة مع قابلية التوسع مستقبلاً.',
              },
              {
                q: 'هل يمكن تخزين التسجيلات سحابيًا؟',
                a: 'نعم، تتوفر خيارات تسجيل محلي وسحابي حسب متطلبات الأمان والميزانية.',
              },
              {
                q: 'هل تشمل الخدمة تدريب الموظفين؟',
                a: 'نعم، يتم تدريب فريق العميل على التشغيل الأساسي وإدارة التنبيهات.',
              },
              {
                q: 'هل يتوفر دعم بعد البيع؟',
                a: 'يتوفر دعم فني عبر الهاتف والزيارات الميدانية وفق نوع العقد.',
              },
            ].map((item) => (
              <article key={item.q} className="rounded-xl border border-white/15 bg-white/5 p-5">
                <h2 className="text-lg font-bold">{item.q}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
