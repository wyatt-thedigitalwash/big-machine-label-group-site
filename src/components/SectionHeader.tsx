export default function SectionHeader({
  title,
  as = "h2",
}: {
  title: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <div className="flex items-center gap-8 mb-10">
      <Tag className="font-[family-name:var(--font-display)] text-[40px] md:text-[64px] uppercase text-white leading-none whitespace-nowrap">
        {title}
      </Tag>
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "#333333" }}
      />
    </div>
  );
}
