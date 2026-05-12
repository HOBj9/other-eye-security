type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionTitleProps) {
  return (
    <header className={centered ? 'text-center' : ''}>
      <p className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white/85">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-base">{description}</p>
      ) : null}
    </header>
  );
}
