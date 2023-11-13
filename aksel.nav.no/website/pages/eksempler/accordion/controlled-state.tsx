import { withDsExample } from "@/web/examples/withDsExample";
import { Accordion, Button } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid place-items-start gap-2">
      <Button variant="secondary" onClick={() => setOpen(!open)}>
        Toggle Accordion
      </Button>
      <Accordion>
        <Accordion.Item open={open}>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre unntak.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item open={open}>
          <Accordion.Header>
            Til deg som har yrkesskade eller yrkessykdom
          </Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
