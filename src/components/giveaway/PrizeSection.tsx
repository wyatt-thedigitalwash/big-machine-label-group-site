import Image from "next/image";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";

export default function PrizeSection() {
  const prizeImage = CAMPAIGN.prizeImageSrc ?? CAMPAIGN.images.still;
  const prizeAlt = CAMPAIGN.prizeImageSrc
    ? "Football signed by Riley Green and Peyton Manning"
    : `${CAMPAIGN.artist} and ${CAMPAIGN.featuring} at a bar table`;

  return (
    <section className="w-full px-6 py-20 md:px-20 md:py-28" aria-labelledby="prize-heading">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-[1200px] mx-auto">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={prizeImage}
            alt={prizeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 id="prize-heading" className="gv-head text-[32px] md:text-[48px] leading-[1.02]">
            One ball. Two signatures.
          </h2>
          <p className="gv-body text-[15px] md:text-[16px] leading-relaxed mt-6 text-[var(--gv-cream)]/85">
            {CAMPAIGN.prize.name}, in honor of the Alabama vs. Tennessee game and the song
            that goes with it. Riley Green sings for one side of the table. Peyton Manning
            holds down the other. The winner gets the ball they both signed.
          </p>
          <dl className="gv-body mt-8 grid grid-cols-2 gap-6 text-[13px]">
            <div>
              <dt className="gv-sub uppercase text-[12px] md:text-[13px] text-[var(--gv-cream)]">Approximate retail value</dt>
              <dd className="mt-1 text-[15px]">{CAMPAIGN.prize.arv}</dd>
            </div>
            <div>
              <dt className="gv-sub uppercase text-[12px] md:text-[13px] text-[var(--gv-cream)]">Drawing</dt>
              <dd className="mt-1 text-[15px]">{CAMPAIGN.drawingOn}</dd>
            </div>
            <div>
              <dt className="gv-sub uppercase text-[12px] md:text-[13px] text-[var(--gv-cream)]">Entry window</dt>
              <dd className="mt-1 text-[15px]">{CAMPAIGN.entryWindowDisplay}</dd>
            </div>
            <div>
              <dt className="gv-sub uppercase text-[12px] md:text-[13px] text-[var(--gv-cream)]">Winners</dt>
              <dd className="mt-1 text-[15px]">{CAMPAIGN.prize.quantity}</dd>
            </div>
          </dl>
          <a
            href={CAMPAIGN.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block gv-sub uppercase text-[14px] px-8 py-4 border-2 border-[var(--gv-cream)] text-[var(--gv-cream)] transition-colors duration-[400ms] ease-out hover:bg-[var(--gv-cream)] hover:text-[var(--gv-charcoal)]"
          >
            Listen to Alabama vs. Tennessee
          </a>
        </div>
      </div>
    </section>
  );
}
