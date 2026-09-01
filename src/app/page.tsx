import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesPreview from "@/components/home/ServicesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import Results from "@/components/home/Results";
import ProcessPreview from "@/components/home/ProcessPreview";
import TeamSection from "@/components/about/TeamSection";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ServicesPreview />
      <AboutPreview />
      <Results />
      <ProcessPreview />
      <TeamSection />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}