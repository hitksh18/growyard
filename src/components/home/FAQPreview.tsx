"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import FAQList from "./FAQList";
import { faq } from "@/data/faq";

export default function FAQPreview() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading label="FAQ" number="06">
          Questions answered.
        </SectionHeading>

        <div className="mt-16">
          <FAQList items={faq} />
        </div>
      </Container>
    </section>
  );
}
