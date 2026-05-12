import { MainLayout } from '../layouts/MainLayout';

export function ServicesPage() {
  return (
    <MainLayout>
      <section className="container-shell py-20">
        <div className="glass-card p-8 md:p-10">
          <h1 className="text-3xl font-bold">الخدمات</h1>
          <p className="mt-4 text-white/75">
            نقدم باقة خدمات وهمية للاستخدام التجريبي، مصممة لتغطية دورة المشروع الأمني كاملة.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'تصميم أنظمة CCTV حسب مخطط الموقع',
              'توريد أجهزة مراقبة احترافية وضمانات ممتدة',
              'تركيب وربط الكاميرات مع الشبكة الداخلية',
              'إعداد التنبيهات والربط مع الهواتف الذكية',
              'عقود صيانة وقائية وتحديثات دورية',
              'تقارير شهرية عن الأداء والحوادث',
            ].map((service) => (
              <div key={service} className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/85">
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
