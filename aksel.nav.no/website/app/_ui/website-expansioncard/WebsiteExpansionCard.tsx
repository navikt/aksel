import { type PortableTextBlock, stegaClean } from "next-sanity";
import {
  ExpansionCardContent,
  ExpansionCardDescription,
  ExpansionCardHeader,
  ExpansionCardTitle,
} from "@navikt/ds-react/ExpansionCard";
import { CustomPortableText } from "@/app/CustomPortableText";
import type { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { WebsiteExpansionCardTracked } from "./WebsiteExpansionCardTracked";

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
    <WebsiteExpansionCardTracked heading={heading}>
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
    </WebsiteExpansionCardTracked>
  );
}

export { WebsiteExpansionCard };
