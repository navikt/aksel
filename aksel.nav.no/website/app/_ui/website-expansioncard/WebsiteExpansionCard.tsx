import { PortableTextBlock, stegaClean } from "next-sanity";
import {
  ExpansionCard,
  ExpansionCardContent,
  ExpansionCardDescription,
  ExpansionCardHeader,
  ExpansionCardTitle,
} from "@navikt/ds-react/ExpansionCard";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

const cardSize = {
  h2: "large",
  h3: "medium",
  h4: "small",
} as const;

function WebsiteExpansionCard(
  props: ExtractPortableComponentProps<"expansioncard">,
) {
  const { heading, body, heading_level, description } = props.value;

  if (!heading || !body || body.length === 0 || !heading_level) {
    return null;
  }

  return (
    <ExpansionCard
      id="aksel-expansioncard"
      aria-label={heading}
      data-block-margin="space-28"
    >
      <ExpansionCardHeader>
        <ExpansionCardTitle
          as={stegaClean(heading_level)}
          size={cardSize[stegaClean(heading_level)]}
        >
          {heading}
        </ExpansionCardTitle>
        {description && (
          <ExpansionCardDescription>{description}</ExpansionCardDescription>
        )}
      </ExpansionCardHeader>
      <ExpansionCardContent>
        <CustomPortableText value={body as PortableTextBlock[]} />
      </ExpansionCardContent>
    </ExpansionCard>
  );
}

export { WebsiteExpansionCard };
