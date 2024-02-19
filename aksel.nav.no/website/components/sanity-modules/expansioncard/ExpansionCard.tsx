import { vercelStegaCleanAll } from "@sanity/client/stega";
import { ExpansionCard as DsExpansionCard } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

type ExpansionCardProps = {
  node: {
    heading: string;
    heading_level: "h3" | "h4";
    description?: string;
    body: any[];
  };
};

const ExpansionCard = ({ node }: ExpansionCardProps) => {
  if (!node.heading || !node.body || !node.heading_level) {
    return null;
  }

  return (
    <DsExpansionCard
      id="aksel-expansioncard"
      className="mb-7 max-w-2xl"
      aria-label={vercelStegaCleanAll(node.heading)}
    >
      <DsExpansionCard.Header>
        <DsExpansionCard.Title
          as={vercelStegaCleanAll(node.heading_level)}
          size={
            vercelStegaCleanAll(node.heading_level) === "h3"
              ? "medium"
              : "small"
          }
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
