import type { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, creative & design, social media, performance marketing, content, web development, SEO and marketing strategy — GrowthYard services built for growth.",
};

export default function ServicesPage() {
  return (
    <section className="pb-24 pt-36 lg:pb-32 lg:pt-44">
      <Container>
        <SectionHeading
          label="Services"
          number="01"
          description="Every engagement is scoped around your goals. These are the disciplines we bring together to grow ambitious brands."
        >
          Services built for growth.
        </SectionHeading>
        <div className="mt-20">
          <ServicesList services={services} />
        </div>
      </Container>
    </section>
  );
}