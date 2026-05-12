import { SectionTitle } from '../components/ui/SectionTitle';

type SectionPlaceholderProps = {
  id: string;
  title: string;
};

export function SectionPlaceholder({ id, title }: SectionPlaceholderProps) {
  return (
    <section id={id} className="container-shell py-12 md:py-16">
      <div className="glass-card p-8">
        <SectionTitle
          eyebrow="قريبًا"
          title={title}
          description="هذا القسم placeholder جاهز للتطوير في المرحلة القادمة."
        />
      </div>
    </section>
  );
}
