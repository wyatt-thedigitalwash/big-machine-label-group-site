import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import RosterSection from "@/components/RosterSection";
import OnTourSection from "@/components/OnTourSection";
import WatchCarousel from "@/components/WatchCarousel";
import LabelStatementSection from "@/components/LabelStatementSection";
import NewsTeaserSection from "@/components/NewsTeaserSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RosterSection />
      <Suspense fallback={null}>
        <OnTourSection />
      </Suspense>
      <WatchCarousel />
      <LabelStatementSection />
      <NewsTeaserSection />
    </>
  );
}
