import type { Service } from "@/types/service";
import ServiceItem from "./ServiceItem";

interface ServicesListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
      {services.map((service, i) => (
        <ServiceItem key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}