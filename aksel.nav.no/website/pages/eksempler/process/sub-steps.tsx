import { EnvelopeOpenIcon } from "@navikt/aksel-icons";
import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Søknadssteg med tilhørende tittel
      </Heading>
      <Process aria-labelledby="Process-heading" activeStep={5}>
        <Process.Step
          title="Barnet ble født"
          timestamp="04. august 2025"
          bullet={<Process.Checkmark />}
        />
        <Process.Step
          title="Du søkte om FORELDREPENGER"
          timestamp="22. august 2025"
          bullet={<Process.Checkmark />}
        />
        <Process.Step
          title="Du la til 2 vedlegg"
          timestamp="23. august 2025 KL 09.05"
        />
        <Process.Step
          title="Du la til 4 vedlegg"
          timestamp="23. august 2025 KL 11.30"
        />
        <Process.Step
          title="Du har fått et svar på søknaden din"
          timestamp="25. august 2025"
          bullet={<EnvelopeOpenIcon />}
        />
        <Process.Step
          title="Nav har etterspurt opplysninger"
          timestamp="8. september 2025"
        />
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const VariantNumber = {
  render: Example,
};

export const args = {
  index: 2,
};
