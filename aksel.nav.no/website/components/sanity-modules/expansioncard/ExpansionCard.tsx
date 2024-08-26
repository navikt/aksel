import { ExpansionCard as DsExpansionCard } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

type ExpansionCardProps = {
  node: {
    heading: string;
    heading_level: "h2" | "h3" | "h4";
    description?: string;
    body: any[];
  };
};

const ExpansionCard = ({ node }: ExpansionCardProps) => {
  if (!node.heading || !node.body || !node.heading_level) {
    return null;
  }

  const cardSize = {
    h2: "large",
    h3: "medium",
    h4: "small",
  } as const;

  return (
    <DsExpansionCard
      id="aksel-expansioncard"
      className="mb-7 max-w-2xl"
      aria-label={node.heading}
    >
      <DsExpansionCard.Header>
        <DsExpansionCard.Title
          as={node.heading_level}
          size={cardSize[node.heading_level]}
          className="text-aksel-heading"
        >
          {node.heading}
        </DsExpansionCard.Title>
        {node?.description && (
          <DsExpansionCard.Description>
            {node.description}
          </DsExpansionCard.Description>
        )}
      </DsExpansionCard.Header>
      <DsExpansionCard.Content>
        <SanityBlockContent blocks={node.body} />
      </DsExpansionCard.Content>
    </DsExpansionCard>
  );
};

export default function Component(props: ExpansionCardProps) {
  return (
    <ErrorBoundary boundaryName="ExpansionCard">
      <ExpansionCard {...props} />
    </ErrorBoundary>
  );
}
