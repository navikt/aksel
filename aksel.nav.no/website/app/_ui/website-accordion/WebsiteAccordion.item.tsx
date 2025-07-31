"use client";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
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
      onOpenChange={() => openToggle(index)}
    >
      <AccordionHeader>{title}</AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export { WebsiteAccordionItem };
