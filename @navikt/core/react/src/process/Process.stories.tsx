import { Meta, StoryObj } from "@storybook/react";
import { format } from "date-fns";
import React from "react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { HStack } from "../layout/stack";
import { Provider } from "../provider";
import { en } from "../util/i18n/locales";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";
import { Process } from "./Process";

const meta: Meta<typeof Process> = {
  title: "ds-react/Process",
  component: Process,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof Process>;

const getDateAfter = (days: number) => {
  const date = new Date();
  return format(new Date(date.setDate(date.getDate() + days)), "d. MMMM yyy");
};

export const NumberedBullets: Story = {
  render: () => (
    <Process>
      <Process.Event status="completed" bullet={0} title="Start søknad" />
      <Process.Event status="completed" bullet={1} title="Personopplysninger" />
      <Process.Event status="completed" title="Substep 1" />
      <Process.Event status="completed" title="Substep 2" />
      <Process.Event status="completed" title="Substep 3" />
      <Process.Event status="completed" bullet={2} title="Saksopplysninger" />

      <Process.Event
        bullet={3}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
        status="completed"
      />
      <Process.Event status="completed" title="Substep 1" />
      <Process.Event status="active" title="Substep 2" />
      <Process.Event title="Substep 3" />
      <Process.Event bullet={4} title="Vedlegg" />
      <Process.Event bullet={5} title="Oppsummering" />
    </Process>
  ),
};

export const IconBullets: Story = {
  render: () => (
    <Process>
      <Process.Event
        status="completed"
        bullet={<SparklesFillIcon />}
        title="Start søknad"
      />
      <Process.Event
        status="completed"
        bullet={<SparklesFillIcon />}
        title="Personopplysninger"
      />
      <Process.Event status="completed" title="Substep 1" />
      <Process.Event status="completed" title="Substep 2" />
      <Process.Event status="completed" title="Substep 3" />
      <Process.Event
        status="completed"
        bullet={<SparklesFillIcon />}
        title="Saksopplysninger"
      />

      <Process.Event
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
        status="completed"
      />
      <Process.Event status="completed" title="Substep 1" />
      <Process.Event status="active" title="Substep 2" />
      <Process.Event title="Substep 3" />
      <Process.Event bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Event bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  ),
};

export const Content: Story = {
  render: () => (
    <Process>
      <Process.Event
        status="completed"
        bullet={<SparklesFillIcon />}
        title="Start søknad"
      >
        <ContentOne />
      </Process.Event>
      <Process.Event
        status="completed"
        bullet={<SparklesFillIcon />}
        title="Personopplysninger"
      />
      <Process.Event status="completed" title="Substep 1" />
      <Process.Event status="active" title="Substep 2" />
      <Process.Event title="Substep 3" />
      <Process.Event bullet={<SparklesFillIcon />} title="Saksopplysninger" />

      <Process.Event
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      >
        <ContentTwo />
      </Process.Event>
      <Process.Event title="Substep 1" />
      <Process.Event title="Substep 2" />
      <Process.Event title="Substep 3" />
      <Process.Event bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Event bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  ),
};

export const SimpleBullets: Story = {
  render: () => (
    <Process>
      <Process.Event status="completed" title="Start søknad" />
      <Process.Event status="completed" title="Personopplysninger" />
      <Process.Event status="active" title="Saksopplysninger" />

      <Process.Event title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst" />
      <Process.Event title="Vedlegg" />
      <Process.Event title="Oppsummering" />
    </Process>
  ),
};

export const HideStatusText: Story = {
  render: () => (
    <Process hideStatusText>
      <Process.Event status="completed" title="Start søknad" />
      <Process.Event status="completed" title="Personopplysninger" />
      <Process.Event status="active" title="Saksopplysninger" />

      <Process.Event title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst" />
      <Process.Event title="Vedlegg" />
      <Process.Event title="Oppsummering" />
    </Process>
  ),
};

export const Translation: Story = {
  render: () => (
    <div>
      <div>
        <h3>Nb</h3>
        <Process>
          <Process.Event status="completed" title="Start søknad" />
          <Process.Event status="active" title="Saksopplysninger" />
          <Process.Event title="Vedlegg" />
        </Process>
      </div>
      <div>
        <h3>En</h3>
        <Provider locale={en}>
          <Process>
            <Process.Event status="completed" title="Start søknad" />
            <Process.Event status="active" title="Saksopplysninger" />
            <Process.Event title="Vedlegg" />
          </Process>
        </Provider>
      </div>
      <div>
        <h3>Custom</h3>
        <Provider
          locale={en}
          translations={{ Process: { active: "Under arbeid" } }}
        >
          <Process>
            <Process.Event status="completed" title="Start søknad" />
            <Process.Event status="active" title="Saksopplysninger" />
            <Process.Event title="Vedlegg" />
          </Process>
        </Provider>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(1);

    const handleStepClick = (direction: 1 | -1) => {
      setActiveStep((prevStep) => {
        const newStep = prevStep + direction;
        if (newStep < 0) return 0;
        if (newStep > 5) return 5;
        return newStep;
      });
    };

    const isDone = (step: number) => {
      return activeStep > step;
    };

    const getEventState = (step: number) => {
      if (activeStep === step) {
        return "active";
      }
      if (isDone(step)) {
        return "completed";
      }
      return "inactive";
    };

    return (
      <Process style={{ maxWidth: "40rem" }}>
        <Process.Event
          bullet={isDone(0) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step one"
          timestamp={getDateAfter(3)}
          hideContent={activeStep > 0}
          status={getEventState(0)}
        >
          <div>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
              sint commodi omnis autem provident velit accusantium fugit vitae
              veritatis, error aut culpa, vero animi molestiae, ab sunt
              laboriosam eligendi distinctio.
            </div>
            <HStack gap="space-8" marginBlock="space-12">
              <Button size="small" onClick={() => handleStepClick(1)}>
                Next Step
              </Button>
            </HStack>
          </div>
        </Process.Event>
        <Process.Event
          bullet={isDone(1) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step two"
          timestamp={getDateAfter(2)}
          status={getEventState(1)}
        >
          {activeStep === 1 && (
            <div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                sint commodi omnis autem provident velit accusantium fugit vitae
                veritatis, error aut culpa, vero animi molestiae, ab sunt
                laboriosam eligendi distinctio.
              </div>
              <HStack gap="space-8" marginBlock="space-12">
                <Button size="small" onClick={() => handleStepClick(-1)}>
                  Previous Step
                </Button>
                <Button size="small" onClick={() => handleStepClick(1)}>
                  Next Step
                </Button>
              </HStack>
            </div>
          )}
        </Process.Event>
        <Process.Event
          title="Substep 1"
          status={activeStep > 1 ? "completed" : "inactive"}
        />
        <Process.Event
          title="Substep 2"
          status={activeStep > 1 ? "completed" : "inactive"}
        />
        <Process.Event
          bullet={isDone(2) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step three"
          status={getEventState(2)}
        >
          {activeStep === 2 && (
            <div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                sint commodi omnis autem provident velit accusantium fugit vitae
                veritatis, error aut culpa, vero animi molestiae, ab sunt
                laboriosam eligendi distinctio.
              </div>
              <HStack gap="space-8" marginBlock="space-12">
                <Button size="small" onClick={() => handleStepClick(-1)}>
                  Previous Step
                </Button>
                <Button size="small" onClick={() => handleStepClick(1)}>
                  Next Step
                </Button>
              </HStack>
            </div>
          )}
        </Process.Event>

        <Process.Event
          bullet={isDone(3) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step four"
          timestamp={getDateAfter(1)}
          status={getEventState(3)}
        >
          {activeStep === 3 && (
            <div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                sint commodi omnis autem provident velit accusantium fugit vitae
                veritatis, error aut culpa, vero animi molestiae, ab sunt
                laboriosam eligendi distinctio.
              </div>
              <HStack gap="space-8" marginBlock="space-12">
                <Button size="small" onClick={() => handleStepClick(-1)}>
                  Previous Step
                </Button>
                <Button size="small" onClick={() => handleStepClick(1)}>
                  Next Step
                </Button>
              </HStack>
            </div>
          )}
        </Process.Event>
        <Process.Event
          bullet={isDone(4) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step five"
          status={getEventState(4)}
        >
          {activeStep === 4 && (
            <div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                sint commodi omnis autem provident velit accusantium fugit vitae
                veritatis, error aut culpa, vero animi molestiae, ab sunt
                laboriosam eligendi distinctio.
              </div>
              <HStack gap="space-8" marginBlock="space-12">
                <Button size="small" onClick={() => handleStepClick(-1)}>
                  Previous Step
                </Button>
                <Button size="small" onClick={() => handleStepClick(1)}>
                  Next Step
                </Button>
              </HStack>
            </div>
          )}
        </Process.Event>
        <Process.Event
          bullet={isDone(5) ? <Process.Checkmark /> : <SparklesFillIcon />}
          title="Step six"
          status={getEventState(5)}
        >
          {activeStep === 5 && (
            <div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
                sint commodi omnis autem provident velit accusantium fugit vitae
                veritatis, error aut culpa, vero animi molestiae, ab sunt
                laboriosam eligendi distinctio.
              </div>
              <HStack gap="space-8" marginBlock="space-12">
                <Button size="small" onClick={() => handleStepClick(-1)}>
                  Previous Step
                </Button>
              </HStack>
            </div>
          )}
        </Process.Event>
      </Process>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  NumberedBullets,
  IconBullets,
  Content,
  SimpleBullets,
  HideStatusText,
  Translation,
  InteractiveDemo,
});

function ContentOne() {
  return (
    <div>
      <h2>Vedlegg er lastet opp</h2>
      <p>
        Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
        saksbehandler.
      </p>
    </div>
  );
}

function ContentTwo() {
  return (
    <div>
      <h2>Vedtak er gjort</h2>
      <p>
        Saksbehandler har gjort endelig vedtak i saken og det er sendt ut varsel
        til søker.
      </p>
    </div>
  );
}
