import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Reveal from "@/components/animations/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-paper/10 py-24 lg:py-32">
      <div
        className="glow-behind absolute left-1/2 top-[-30%] -z-10 h-[70%] w-[90%] -translate-x-1/2 opacity-70"
        aria-hidden="true"
      />
      <div
        className="glow-behind absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <Reveal>
                <SectionLabel number="07">Let&apos;s get to work</SectionLabel>
                <h2
                  className="mt-8 text-balance font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.7rem)", lineHeight: 1.03 }}
                >
                  Let&apos;s build{" "}
                  <span className="serif-em">something amazing.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-paper/55 sm:text-lg">
                  Tell us where you want to grow. We&apos;ll come back with
                  honest ideas, the right approach, and no fluff.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="mt-12 max-w-md">
                <ContactInfo />
              </div>
              <p className="serif-em mt-8 text-xl leading-snug text-paper/45">
                One conversation. A clear plan. Growth you can measure.
              </p>
            </Reveal>
          </div>

          <div className="flex items-center lg:col-span-6">
            <Reveal delay={0.1} className="w-full">
              <div className="w-full border border-paper/10 bg-ink/70 p-6 backdrop-blur-sm sm:p-10">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="serif-em text-2xl text-paper">
                    Start a project
                  </h3>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-paper/35">
                    Reply within 24 hours
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-paper/45">
                  The form opens a ready-to-send email draft — nothing submitted
                  until you choose to send.
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