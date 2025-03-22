import { PortableTextBlock } from "next-sanity";
import {
  ExpansionCard as DsExpansionCard,
  ExpansionCardContent,
  ExpansionCardDescription,
  ExpansionCardHeader,
  ExpansionCardTitle,
  /* @ts-expect-error Workspace cant resolve valid import */
} from "@navikt/ds-react/ExpansionCard";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CustomPortableText } from "../portable-text/CustomPortableText";

const cardSize = {
  h2: "large",
  h3: "medium",
  h4: "small",
} as const;

function ExpansionCard(props: ExtractPortableComponentProps<"expansioncard">) {
  const { heading, body, heading_level, description } = props.value;

  if (!heading || !body || body.length === 0 || !heading_level) {
    return null;
  }

  return (
    <DsExpansionCard
      id="aksel-expansioncard"
      aria-label={heading}
      data-block-margin="space-28"
    >
      <ExpansionCardHeader>
        <ExpansionCardTitle as={heading_level} size={cardSize[heading_level]}>
          {heading}
        </ExpansionCardTitle>
        {description && (
          <ExpansionCardDescription>{description}</ExpansionCardDescription>
        )}
      </ExpansionCardHeader>
      <ExpansionCardContent>
        <CustomPortableText value={body as PortableTextBlock[]} />
      </ExpansionCardContent>
    </DsExpansionCard>
  );
}

export { ExpansionCard };
