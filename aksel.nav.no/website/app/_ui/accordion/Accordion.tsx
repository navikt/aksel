import { PortableTextBlock } from "next-sanity";
import {
  Accordion as DsAccordion,
  /* @ts-expect-error Workspace cant resolve valid import */
} from "@navikt/ds-react/Accordion";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CustomPortableText } from "../portable-text/CustomPortableText";
import { AccordionItem } from "./Accordion.item";
import { AccordionProvider } from "./Accordion.provider";

function Accordion(props: ExtractPortableComponentProps<"accordion">) {
  const { list } = props.value;

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <AccordionProvider options={list.length}>
      <DsAccordion data-block-margin="space-28">
        {list.map((node, index) => (
          <AccordionItem key={node._key} index={index} title={node.title}>
            <CustomPortableText
              value={(node.content ?? []) as PortableTextBlock[]}
            />
          </AccordionItem>
        ))}
      </DsAccordion>
    </AccordionProvider>
  );
}

export { Accordion };
