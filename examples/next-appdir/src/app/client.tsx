"use client";

import { ExpansionCard } from "@navikt/ds-react";
import { omit, useClientLayoutEffect } from "@navikt/ds-react/Utils";

export const ClientComponent = () => {
  console.info({ omit: omit({ test: "value" }, ["test"]) });
  useClientLayoutEffect(() => {
    console.info("mounted in client-component");
  }, []);

  return (
    <div>
      client{" "}
      <ExpansionCard aria-label="Demo med bare tittel">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Utbetaling av sykepenger</ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>innhold</ExpansionCard.Content>
      </ExpansionCard>
    </div>
  );
};
