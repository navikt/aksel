import { Accordion as DsAccordion } from "@navikt/ds-react";
import React from "react";
import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

const Accordion = ({
  node,
}: {
  node: SanityT.Schema.accordion;
}): JSX.Element => {
  if (!node || node.list.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <DsAccordion>
        {node.list.map((el) => (
          <DsAccordion.Item key={el._key}>
            <DsAccordion.Header>{el.title}</DsAccordion.Header>
            <DsAccordion.Content>
              <SanityBlockContent
                blocks={el.content}
                className="algolia-ignore-index"
              />
            </DsAccordion.Content>
          </DsAccordion.Item>
        ))}
      </DsAccordion>
    </div>
  );
};

export default withErrorBoundary(Accordion, "Accordion");
