import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Dette har skjedd i saken
      </Heading>
      <Process aria-labelledby="Process-heading">
        <Process.Event
          status="completed"
          title="Søknad om livsopphold er ferdig behandlet"
          bullet={<Process.Checkmark />}
          timestamp="04. august 2025 kl. 14.30"
        />
        <Process.Event
          status="completed"
          title="Du leverte etterspurte dokumenter"
          bullet={<Process.Checkmark />}
          timestamp="04. august 2025 kl. 14.55"
        />
        <Process.Event
          status="completed"
          title="Nav trenger felre opplysninger i saken din"
          bullet={<Process.Checkmark />}
          timestamp="08. august 2025 kl. 11.10"
        />
        <Process.Event
          status="completed"
          title="Søknad om livsopphold er under behandling"
          bullet={<Process.Checkmark />}
          timestamp="11. august 2025 kl. 09.48"
        />
        <Process.Event
          status="active"
          title="Søknad med vedlegg er sendt til Hamar"
          bullet={5}
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
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Process inneholder en egen `<Process.Checkmark />` komponent i tilfeller der du ønsker å vise at et steg er fullført.",
};
