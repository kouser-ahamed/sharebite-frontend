import LatestFoodsSection from "@/components/all-foods/LatestFoodsSection";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LatestFoodsSection />
    </div>
  );
}
