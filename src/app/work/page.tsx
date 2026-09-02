import type { Metadata } from "next";
import ProjectGrid from "@/components/work/ProjectGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from GROWYARD — brand, web, social and performance work built to drive measurable growth.",
};

export default function WorkPage() {
  return (
    <section className="pb-24 pt-36 lg:pb-32 lg:pt-44">
      <Container>
        <SectionHeading
          label="Work"
          number="01"
          description="A selection of projects where strategy, creative and growth come together. New case studies are added as real GROWYARD work ships."
        >
          Work that moves the needle.
        </SectionHeading>
        <div className="mt-20">
          <ProjectGrid
            projects={projects}
            className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2"
          />
        </div>
      </Container>
    </section>
  );
}