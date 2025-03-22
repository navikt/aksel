"use client";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem as DsAccordionItem,
  /* @ts-expect-error Workspace cant resolve valid import */
} from "@navikt/ds-react/Accordion";
import { useAccordion } from "./Accordion.provider";

function AccordionItem({
  children,
  index,
  title = "",
}: {
  children: React.ReactNode;
  index: number;
  title?: string;
}) {
  const { currentOpen, openToggle } = useAccordion();
  return (
    <DsAccordionItem
      open={currentOpen.includes(index)}
      onOpenChange={() => openToggle(index)}
    >
      <AccordionHeader>{title}</AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </DsAccordionItem>
  );
}

export { AccordionItem };
