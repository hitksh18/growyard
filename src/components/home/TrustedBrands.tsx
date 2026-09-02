import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";

/**
 * Trusted brands strip.
 *
 * Replace the placeholder names below with real GROWTHYARD client brand
 * names / logos once they are confirmed. Do not list clients you don't have.
 */
const brands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];

export default function TrustedBrands() {
  return (
    <section className="border-t border-paper/10 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8">
          <SectionLabel>Trusted by growing brands</SectionLabel>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {brands.map((brand) => (
              <li
                key={brand}
                className="flex h-16 items-center justify-center rounded-md border border-paper/5 bg-paper/[0.02] font-medium tracking-tight text-paper/40 sm:h-20"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
