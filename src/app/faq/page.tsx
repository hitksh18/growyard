import type { Metadata } from "next";
import FAQList from "@/components/home/FAQList";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about working with GrowthYard — engagements, timelines, teams and how to start.",
};

export default function FAQPage() {
  return (
    <section className="pb-24 pt-36 lg:pb-32 lg:pt-44">
      <Container>
        <SectionHeading
          label="FAQ"
          number="01"
          description="A few things people usually ask before we start. Anything else — just reach out."
        >
          Questions answered.
        </SectionHeading>

        <div className="mt-20 lg:mt-24">
          <FAQList items={faq} />
        </div>
      </Container>
    </section>
  );
}
