import { Accordion as DsAccordion } from "@navikt/ds-react";
import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AccordionT } from "@/types";

const Accordion = ({ node }: { node: AccordionT }) => {
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
                className="toc-ignore"
                noLastMargin
              />
            </DsAccordion.Content>
          </DsAccordion.Item>
        ))}
      </DsAccordion>
    </div>
  );
};

export default withErrorBoundary(Accordion, "Accordion");
