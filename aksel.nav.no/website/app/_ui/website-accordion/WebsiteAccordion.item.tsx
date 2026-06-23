"use client";

import { Events } from "@navikt/analytics-types";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { useWebsiteAccordion } from "./WebsiteAccordion.provider";

function WebsiteAccordionItem({
  children,
  index,
  title = "",
}: {
  children: React.ReactNode;
  index: number;
  title?: string;
}) {
  const { currentOpen, openToggle } = useWebsiteAccordion();
  return (
    <AccordionItem
      open={currentOpen.includes(index)}
      onOpenChange={() => {
        const isOpen = currentOpen.includes(index);
        openToggle(index);
        if (isOpen) {
          umamiTrack(Events.ACCORDION_LUKKET, { tittel: title });
        } else {
          umamiTrack(Events.ACCORDION_APNET, { tittel: title });
        }
      }}
    >
      <AccordionHeader>{title}</AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export { WebsiteAccordionItem };
