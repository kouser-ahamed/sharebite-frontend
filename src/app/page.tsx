import LatestFoodsSection from "@/components/home/LatestFoodsSection";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";
import HowShareBiteWorks from "@/components/home/HowShareBiteWorks";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LatestFoodsSection />
      <HowShareBiteWorks />
    </div>
  );
}
