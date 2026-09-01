import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Reveal from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with GrowthYard. Tell us where you want to grow and we'll come back with honest ideas and the right approach.",
};

export default function ContactPage() {
  return (
    <section className="pb-28 pt-36 lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading label="Contact" number="01">
              Let&apos;s build something amazing.
            </SectionHeading>
            <p className="mt-6 max-w-md leading-relaxed text-paper/60">
              Tell us where you want to grow. We&apos;ll come back with honest
              ideas, the right approach, and no fluff.
            </p>
            <div className="mt-10">
              <ContactInfo />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="w-full border border-paper/10 bg-paper/[0.02] p-6 sm:p-10">
                <h2 className="serif-em text-2xl text-paper">
                  Start a project
                </h2>
                <p className="mt-2 text-sm text-paper/45">
                  The form opens a ready-to-send email draft.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}