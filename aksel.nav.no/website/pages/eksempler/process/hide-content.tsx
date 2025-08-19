import React from "react";
import {
  BabyWrappedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeOpenIcon,
  TasklistSendIcon,
} from "@navikt/aksel-icons";
import { Button, HStack, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <>
      <HStack gap="space-8" justify="center" marginBlock="0 space-32">
        <Button
          onClick={() => setActiveStep((prev) => prev - 1)}
          icon={<ChevronLeftIcon aria-hidden />}
          disabled={activeStep < 0}
          size="small"
          data-color="info"
        >
          Forrige steg
        </Button>
        <Button
          onClick={() => setActiveStep((prev) => prev + 1)}
          icon={<ChevronRightIcon aria-hidden />}
          disabled={activeStep >= 5}
          size="small"
          data-color="info"
        >
          Neste steg
        </Button>
      </HStack>
      <Process activeStep={activeStep}>
        <Process.Event
          title="Barnet ble født"
          timestamp="04. august 2025"
          bullet={<BabyWrappedIcon />}
        />
        <Process.Event
          title="Du søkte om FORELDREPENGER"
          timestamp="22. august 2025"
          bullet={<TasklistSendIcon />}
          hideContent={activeStep > 3}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
          excepturi velit magni explicabo blanditiis dicta reiciendis commodi
          impedit, necessitatibus delectus natus? Rem quisquam delectus beatae
          perferendis deleniti officiis eveniet dolorem!
        </Process.Event>
        <Process.Event
          title="Du la til 2 vedlegg"
          timestamp="23. august 2025 KL 09.05"
        />
        <Process.Event
          title="Du la til 4 vedlegg"
          timestamp="23. august 2025 KL 11.30"
        />
        <Process.Event
          title="Du har fått et svar på søknaden din"
          timestamp="25. august 2025"
          bullet={<EnvelopeOpenIcon />}
        >
          Rem quisquam delectus beatae perferendis deleniti officiis eveniet
          dolorem!
        </Process.Event>
        <Process.Event
          title="Nav har etterspurt opplysninger"
          timestamp="8. september 2025"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
          excepturi velit magni explicabo blanditiis dicta reiciendis commodi
          impedit.
        </Process.Event>
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
  index: 3,
  desc: "`hideContent` gjør det lettere å dynamiskt skjule innhold i steg når det ikke er relevant for brukeren.",
};
