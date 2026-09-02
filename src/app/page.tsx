import Hero from "@/components/home/Hero";
import HomeSectionRestore from "@/components/home/HomeSectionRestore";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import SelectedWork from "@/components/home/SelectedWork";
import ProcessPreview from "@/components/home/ProcessPreview";
import TeamSection from "@/components/about/TeamSection";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Restore scroll to originating section when returning via the logo */}
      <HomeSectionRestore />
      {/* 01 Brand intro + 02 Manifesto (navbar activates after) */}
      <Hero />
      {/* 03 About */}
      <AboutPreview />
      {/* 04 Services */}
      <ServicesPreview />
      {/* 05 Selected Work */}
      <SelectedWork />
      {/* 06 Process */}
      <ProcessPreview />
      {/* 07 Team */}
      <TeamSection />
      {/* 08 FAQ */}
      <FAQPreview />
      {/* 09 Final CTA */}
      <FinalCTA />
    </>
  );
}