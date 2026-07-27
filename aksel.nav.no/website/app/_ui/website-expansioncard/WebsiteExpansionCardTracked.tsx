"use client";

import { Events } from "@navikt/analytics-types";
import { ExpansionCard } from "@navikt/ds-react/ExpansionCard";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

function WebsiteExpansionCardTracked({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
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
      {children}
    </ExpansionCard>
  );
}

export { WebsiteExpansionCardTracked };
