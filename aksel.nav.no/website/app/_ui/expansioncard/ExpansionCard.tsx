import { ExpansionCard as DsExpansionCard } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { SanityBlockContent } from "@/sanity-block";

const cardSize = {
  h2: "large",
  h3: "medium",
  h4: "small",
} as const;

function ExpansionCard(props: ExtractPortableComponentProps<"expansioncard">) {
  const { heading, body, heading_level, description } = props.value;

  if (!heading || !body || !heading_level) {
    return null;
  }

  return (
    <DsExpansionCard
      id="aksel-expansioncard"
      aria-label={heading}
      data-block-margin="space-28"
    >
      <DsExpansionCard.Header>
        <DsExpansionCard.Title
          as={heading_level}
          size={cardSize[heading_level]}
        >
          {heading}
        </DsExpansionCard.Title>
        {description && (
          <DsExpansionCard.Description>
            {description}
          </DsExpansionCard.Description>
        )}
      </DsExpansionCard.Header>
      <DsExpansionCard.Content>
        <SanityBlockContent blocks={body} />
      </DsExpansionCard.Content>
    </DsExpansionCard>
  );
}

export { ExpansionCard };
