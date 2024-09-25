import { useEffect, useState } from "react";
import { Accordion as DsAccordion } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AccordionT } from "@/types";

type AccordionProps = {
  node?: AccordionT;
};

const Accordion = ({ node }: AccordionProps) => {
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        setOpenAccordions((node?.list ?? []).map((_, i) => i));
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [node?.list]);

  const handleOpenChange = (index: number) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(openAccordions.filter((i) => i !== index));
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

  if (!node || node.list.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <DsAccordion>
        {node.list.map((el, index) => (
          <DsAccordion.Item
            key={el._key}
            open={openAccordions.includes(index)}
            onOpenChange={() => handleOpenChange(index)}
          >
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
