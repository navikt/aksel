"use client";

import { ExpansionCard } from "@navikt/ds-react";
import { Box } from "@navikt/ds-react/Box";
import { DatePicker, useDatepicker } from "@navikt/ds-react/DatePicker";
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

export const MyDatePicker = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.info,
  });

  return (
    <div>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
      <Box paddingBlock="4 0">{selectedDay?.toLocaleDateString()}</Box>
    </div>
  );
};
