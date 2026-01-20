export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-4xl md:text-6xl font-just-me-again-down-here">
      {children}
    </h2>
  );
}
