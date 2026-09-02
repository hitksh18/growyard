import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on strategy, design and growth from the GROWYARD team.",
};

export default function InsightsPage() {
  return (
    <section className="pb-28 pt-36 lg:pt-44">
      <Container>
        <SectionHeading
          label="Insights"
          description="Thinking on strategy, creative and growth as we practise it."
        >
          Notes from the yard.
        </SectionHeading>

        <div className="mt-16 divide-y divide-paper/10 border-y border-paper/10">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.03} distance={16}>
              <article className="py-8">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-paper/40">
                    <span className="uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-6">
                    <h2 className="max-w-2xl text-xl font-medium tracking-tight text-paper sm:text-2xl">
                      {post.title}
                    </h2>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-paper/30"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/50">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}