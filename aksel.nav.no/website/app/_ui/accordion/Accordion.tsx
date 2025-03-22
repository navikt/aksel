import { PortableTextBlock } from "next-sanity";
import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Accordion as DsAccordion,
  /* @ts-expect-error Workspace cant resolve valid import */
} from "@navikt/ds-react/Accordion";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CustomPortableText } from "../portable-text/CustomPortableText";

function Accordion(props: ExtractPortableComponentProps<"accordion">) {
  const { list } = props.value;

  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        setOpenAccordions((list ?? []).map((_, i) => i));
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [list]);

  const handleOpenChange = (index: number) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(openAccordions.filter((i) => i !== index));
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <DsAccordion data-block-margin="space-28">
      {list.map((node, index) => (
        <AccordionItem
          key={node._key}
          open={openAccordions.includes(index)}
          onOpenChange={() => handleOpenChange(index)}
        >
          <AccordionHeader>{node.title}</AccordionHeader>
          <AccordionContent>
            <CustomPortableText
              value={(node.content ?? []) as PortableTextBlock[]}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </DsAccordion>
  );
}

export { Accordion };
