import { CheckmarkHeavyIcon } from "@navikt/aksel-icons";
import { Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Process>
      <Process.Event
        status="completed"
        title="Søknad om livsopphold er ferdig behandlet"
        bullet={<CheckmarkHeavyIcon />}
        timestamp="04. august 2025 kl. 14.30"
      />
      <Process.Event
        status="completed"
        title="Du leverte etterspurte dokumenter"
        bullet={<CheckmarkHeavyIcon />}
        timestamp="04. august 2025 kl. 14.55"
      />
      <Process.Event
        status="completed"
        title="Nav trenger flere opplysninger i saken din"
        bullet={<CheckmarkHeavyIcon />}
        timestamp="08. august 2025 kl. 11.10"
      />
      <Process.Event
        status="completed"
        title="Søknad om livsopphold er sendt videre for behandling"
        bullet={<CheckmarkHeavyIcon />}
        timestamp="11. august 2025 kl. 09.48"
      />
      <Process.Event
        status="active"
        title="Søknad med vedlegg er sendt til Hamar"
        bullet={5}
      />
    </Process>
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
  desc: "Vi anbefaler å bruke `<CheckmarkHeavyIcon />` når du ønsker å vise at et steg er fullført.",
};
