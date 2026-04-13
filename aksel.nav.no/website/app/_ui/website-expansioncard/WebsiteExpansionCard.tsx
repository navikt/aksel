"use client";

import { PortableTextBlock, stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import {
  ExpansionCard,
  ExpansionCardContent,
  ExpansionCardDescription,
  ExpansionCardHeader,
  ExpansionCardTitle,
} from "@navikt/ds-react/ExpansionCard";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

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
      onToggle={(open) => {
        if (open) {
          umamiTrack(Events.UTVIDBART_KORT_APNET, { tittel: heading });
        } else {
          umamiTrack(Events.UTVIDBART_KORT_LUKKET, { tittel: heading });
        }
      }}
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
