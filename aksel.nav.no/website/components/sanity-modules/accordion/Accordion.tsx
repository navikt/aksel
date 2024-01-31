import { Accordion as DsAccordion } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AccordionT } from "@/types";

type AccordionProps = {
  node: AccordionT;
};

const Accordion = ({ node }: AccordionProps) => {
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
              <SanityBlockContent blocks={el.content} className="toc-ignore" />
            </DsAccordion.Content>
          </DsAccordion.Item>
        ))}
      </DsAccordion>
    </div>
  );
};

export default function Component(props: AccordionProps) {
  return (
    <ErrorBoundary boundaryName="Accordion">
      <Accordion {...props} />
    </ErrorBoundary>
  );
}
