"use client";

import {
  ExpansionCard,
  ExpansionCardContent,
  ExpansionCardHeader,
} from "@navikt/ds-react/PREVIEW/ExpansionCard";

export const Test = () => {
  return (
    <ExpansionCard>
      <ExpansionCardHeader>
        <ExpansionCard.Title>Utbetaling av sykepenger</ExpansionCard.Title>
      </ExpansionCardHeader>
      <ExpansionCardContent>Halvor Haugan</ExpansionCardContent>
    </ExpansionCard>
  );
};
