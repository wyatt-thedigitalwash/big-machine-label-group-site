export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-8 mb-10">
      <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[64px] uppercase text-white leading-none whitespace-nowrap">
        {title}
      </h2>
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "#333333" }}
      />
    </div>
  );
}
