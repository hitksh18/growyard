import { Mail, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import Reveal from "@/components/animations/Reveal";

const items = [
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: BRAND.location,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.label} delay={i * 0.05}>
            <div className="flex items-center gap-4 border-t border-paper/10 py-4 last:border-b">
              <span className="flex w-6 justify-center text-accent" aria-hidden="true">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <span className="label-uppercase w-28 shrink-0 text-paper/35">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-paper/80 transition-colors hover:text-accent"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-sm text-paper/80">{item.value}</span>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}