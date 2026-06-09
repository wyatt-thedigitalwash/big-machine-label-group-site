export default function LabelStatementSection() {
  return (
    <section className="w-full bg-black px-8 py-20 md:px-20 md:py-[120px]">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="mx-auto mb-12"
          style={{
            width: 80,
            height: 1,
            backgroundColor: "#CA2125",
          }}
        />

        <h2
          className="font-[family-name:var(--font-display)] text-[40px] md:text-[72px] uppercase text-white leading-[1.05]"
          style={{ letterSpacing: "0.04em" }}
        >
          Independent. Uncompromising. Nashville.
        </h2>

        <p
          className="font-[family-name:var(--font-body)] text-[16px] mx-auto mt-8"
          style={{
            color: "#C8C7C8",
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          Big Machine Records has been home to some of the most enduring artists
          in American music. We sign for the long run.
        </p>
      </div>
    </section>
  );
}
