import { withDsExample } from "@/web/examples/withDsExample";
import { Accordion } from "@navikt/ds-react";

const Example = () => {
  return (
    <>
      <Accordion size="large" headingSize="large">
        <Accordion.Item>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre <a href="#Unntak">unntak</a>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />
      <Accordion size="medium" headingSize="medium">
        <Accordion.Item>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre <a href="#Unntak">unntak</a>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />
      <Accordion size="small" headingSize="small">
        <Accordion.Item>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre <a href="#Unntak">unntak</a>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />
      <Accordion size="small" headingSize="xsmall">
        <Accordion.Item>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre <a href="#Unntak">unntak</a>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
