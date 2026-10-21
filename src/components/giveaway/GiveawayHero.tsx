import Image from "next/image";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";
import EnterCta from "./EnterCta";

export default function GiveawayHero() {
  const { images, heroVideoSrc, artist, featuring } = CAMPAIGN;

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* Background, mobile: built the way the label's 9:16 single art is.
          The square still is scaled to 130% of the viewport width so it runs
          off both sides and fills most of the height, its top sits a few
          percent down, and its bottom fades into the dark floor tone. A dark,
          blurred copy underneath supplies the thin ceiling band above and the
          floor below. Desktop is wide enough to cover. */}
      <div className="absolute inset-0 md:hidden overflow-hidden">
        <Image
          src={images.still}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.6] blur-3xl brightness-[0.45] saturate-[1.2]"
        />
        <div
          className="absolute top-[6svh] left-[-15vw] w-[130vw] aspect-square"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 7%, #000 72%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 7%, #000 72%, transparent 100%)",
          }}
        >
          <Image
            src={images.still}
            alt={`${artist} and ${featuring} raising a beer across a bar table`}
            fill
            priority
            sizes="130vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <Image
        src={images.still}
        alt={`${artist} and ${featuring} raising a beer across a bar table`}
        fill
        priority
        sizes="100vw"
        className="hidden md:block object-cover object-center"
      />
      {heroVideoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover md:hidden motion-reduce:hidden"
          src={heroVideoSrc}
          poster={images.still}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {/* Mobile overlay: the photo fades straight into the page charcoal so the
          headline and CTA sit on the same grey as the section below. */}
      <div
        className="absolute inset-0 md:hidden"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, #272727 0%, #272727 30%, rgba(39,39,39,0.9) 40%, rgba(39,39,39,0.35) 55%, rgba(39,39,39,0.1) 65%, rgba(28,19,15,0.3) 88%, rgba(28,19,15,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, #272727 0%, rgba(39,39,39,0.92) 26%, rgba(39,39,39,0.4) 55%, rgba(39,39,39,0.35) 80%, rgba(39,39,39,0.6) 100%)",
        }}
      />

      {/* Artist line and lockup pinned to the top, headline and CTA to the bottom. */}
      <div className="relative w-full min-h-[100svh] flex flex-col justify-between items-center text-center px-6 pt-10 pb-14 md:px-20 md:pt-14 md:pb-20">
        <div className="w-full">
          <Image
            src={images.artistLockup}
            alt={`${artist} featuring ${featuring}`}
            width={2400}
            height={78}
            priority
            sizes="(max-width: 768px) 80vw, 560px"
            className="gv-rise mx-auto w-[80vw] max-w-[560px] h-auto"
          />
          <Image
            src={images.lockup}
            alt="Alabama vs. Tennessee"
            width={2400}
            height={446}
            priority
            sizes="(max-width: 768px) 92vw, 760px"
            className="gv-rise-2 mx-auto mt-5 w-[92vw] max-w-[760px] h-auto"
          />
        </div>
        <div className="w-full">
          <h1 className="gv-head gv-rise-3 text-[28px] leading-[1.05] md:text-[48px] max-w-[720px] mx-auto">
            Win the football signed by both of them.
          </h1>
          <div className="gv-rise-3 mt-8 flex flex-col items-center gap-4">
            <EnterCta />
            <p className="gv-body text-[11px] md:text-[12px] text-[var(--gv-cream)]/70 max-w-[420px]">
              No purchase necessary. {CAMPAIGN.eligibility.minimumAge}+, US residents only.
              Ends {CAMPAIGN.entryWindowDisplay.split(" through ")[1]}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
