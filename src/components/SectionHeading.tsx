export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="heading-2 text-gold-600">{title}</h2>
      {center && <div className="gold-divider" />}
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-sapphire-700">
          {subtitle}
        </p>
      )}
    </div>
  );
}
