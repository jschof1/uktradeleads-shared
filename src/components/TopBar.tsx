import { Phone, Clock } from "lucide-react";
import type { TopBarProps } from "../types";

export const TopBar = ({
  phone,
  phoneFormatted,
  hours = "Mon - Sat: 7:00 AM - 7:00 PM",
  tagline = "Same-Day Quotes Available",
}: TopBarProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-xs sm:text-sm border-b-2 border-accent">
      <div className="container-custom flex flex-row justify-between items-center gap-2 px-2 sm:px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span>{hours}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-accent font-medium">
            {tagline}
          </span>
          <a
            href={`tel:${phoneFormatted}`}
            className="flex items-center gap-1 sm:gap-2 font-semibold hover:text-accent transition-colors px-2 sm:px-3 py-1 border-2 border-primary-foreground/20 hover:border-accent"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
