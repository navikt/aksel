import { BodyShort, Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Søknadssteg med tilhørende tittel
      </Heading>
      <Process aria-labelledby="Process-heading" activeStep={4}>
        <Process.Step title="02. Jan. 2020. klokken 10:21">
          Din utbetalingsplan har blitt oppdatert, les vedtaket for mer
          informasjon
        </Process.Step>
        <Process.Step title="27. Des. 2019. klokken 14:48">
          <BodyShort>Livsopphold, Husleie er ferdig behandlet</BodyShort>
          <BodyShort textColor="subtle" size="small">
            Et brev fra veileder følger med denne hendelsen
          </BodyShort>
        </Process.Step>
        <Process.Step title="21. Des. 2019. klokken 16:52">
          Du har sendt 10 vedlegg til NAV
        </Process.Step>
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
