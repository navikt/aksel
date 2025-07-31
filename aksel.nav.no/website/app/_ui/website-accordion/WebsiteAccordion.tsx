import { PortableTextBlock } from "next-sanity";
import { Accordion } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { WebsiteAccordionItem } from "./WebsiteAccordion.item";
import { WebsiteAccordionProvider } from "./WebsiteAccordion.provider";

function WebsiteAccordion(props: ExtractPortableComponentProps<"accordion">) {
  const { list } = props.value;

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <WebsiteAccordionProvider options={list.length}>
      <Accordion data-block-margin="space-28">
        {list.map((node, index) => (
          <WebsiteAccordionItem
            key={node._key}
            index={index}
            title={node.title}
          >
            <CustomPortableText
              value={(node.content ?? []) as PortableTextBlock[]}
            />
          </WebsiteAccordionItem>
        ))}
      </Accordion>
    </WebsiteAccordionProvider>
  );
}

export { WebsiteAccordion };
