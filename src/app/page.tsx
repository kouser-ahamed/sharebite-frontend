import LatestFoodsSection from "@/components/home/LatestFoodsSection";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";
import HowShareBiteWorks from "@/components/home/HowShareBiteWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CommunityImpactStatistics from "@/components/home/CommunityImpactStatistics";
import VolunteerSection from "@/components/home/VolunteerSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LatestFoodsSection />
      <HowShareBiteWorks />
      <TestimonialsSection />
      <CommunityImpactStatistics />
      <VolunteerSection />
      <FAQSection />
    </div>
  );
}
