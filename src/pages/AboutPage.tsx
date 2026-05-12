import { MainLayout } from '../layouts/MainLayout';

export function AboutPage() {
  return (
    <MainLayout>
      <section className="container-shell py-20">
        <div className="glass-card p-8 md:p-10">
          <h1 className="text-3xl font-bold">من نحن</h1>
          <p className="mt-4 max-w-3xl text-white/75">
            العين الأخرى الرقمية هي مؤسسة متخصصة في حلول المراقبة الأمنية الذكية، تقدم خدمات التركيب، التشغيل، والصيانة
            للمنشآت السكنية والتجارية والصناعية.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: 'رؤيتنا', text: 'أن نكون الخيار الأول للحلول الأمنية الحديثة في المنطقة.' },
              { title: 'رسالتنا', text: 'تقديم أنظمة موثوقة ترفع مستوى الأمان وتقلل المخاطر التشغيلية.' },
              { title: 'قيمنا', text: 'الشفافية، الجودة، الالتزام بالمواعيد، والدعم المستمر.' },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-white/15 bg-white/5 p-5">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
