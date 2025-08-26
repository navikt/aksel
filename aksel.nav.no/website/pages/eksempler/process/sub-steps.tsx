import {
  BabyWrappedIcon,
  EnvelopeOpenIcon,
  TasklistSendIcon,
} from "@navikt/aksel-icons";
import { Heading, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Søknadssteg med tilhørende tittel
      </Heading>
      <Process aria-labelledby="Process-heading">
        <Process.Event
          status="completed"
          title="Barnet ble født"
          timestamp="04. august 2025"
          bullet={<BabyWrappedIcon />}
        />
        <Process.Event
          status="completed"
          title="Du søkte om FORELDREPENGER"
          timestamp="22. august 2025"
          bullet={<TasklistSendIcon />}
        />
        <Process.Event
          status="completed"
          title="Du la til 2 vedlegg"
          timestamp="23. august 2025 KL 09.05"
        />
        <Process.Event
          status="completed"
          title="Du la til 4 vedlegg"
          timestamp="23. august 2025 KL 11.30"
        />
        <Process.Event
          status="completed"
          title="Du har fått et svar på søknaden din"
          timestamp="25. august 2025"
          bullet={<EnvelopeOpenIcon />}
        />
        <Process.Event
          status="active"
          title="Nav har etterspurt opplysninger"
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
  index: 2,
};
