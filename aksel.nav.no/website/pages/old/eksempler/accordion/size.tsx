import { Accordion, Heading, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="small" spacing textColor="subtle">
        size=large
      </Heading>
      <Accordion size="large" headingSize="large">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />

      <Heading size="small" spacing textColor="subtle">
        size=medium
      </Heading>
      <Accordion size="medium" headingSize="medium">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />

      <Heading size="small" spacing textColor="subtle">
        size=small
      </Heading>
      <Accordion size="small" headingSize="small">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />

      <Heading size="small" spacing textColor="subtle">
        size=small headingSize=xsmall
      </Heading>
      <Accordion size="small" headingSize="xsmall">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
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
