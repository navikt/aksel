import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { format } from "date-fns";
import React from "react";
import {
  CheckmarkIcon,
  GavelSoundBlockIcon,
  SparklesFillIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { HStack, VStack } from "../layout/stack";
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

const getDateAfter = (days) => {
  const date = new Date();
  return format(new Date(date.setDate(date.getDate() + days)), "d. MMMM yyy");
};

export const Default = ({
  activeStep,
  step4Title,
  step4Date,
  step4ShowSlot,
  step4Icon,
  step4HideContent,
  ...props
}) => {
  return (
    <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
      <Process activeStep={activeStep} {...props}>
        <Process.Step title="Start søknad" timestamp={getDateAfter(0)} />
        <Process.Step title="Personopplysninger" timestamp={getDateAfter(3)}>
          Send inn personopplysninger
        </Process.Step>
        <Process.Step title="Saksopplysninger" timestamp={getDateAfter(6)}>
          Send inn saksopplysninger
        </Process.Step>
        <Process.Step
          title={step4Title}
          timestamp={step4Date}
          bullet={
            step4Icon === "<Icon/>" ? (
              <GavelSoundBlockIcon />
            ) : step4Icon === "<empty string>" ? (
              ""
            ) : (
              step4Icon
            )
          }
          hideContent={step4HideContent}
        >
          {step4ShowSlot && (
            <>
              <hr />
              <h2>Heading 2</h2>
              <p>
                Paragraph. Take five, punch the tree, and come back in here with
                a clear head those options are already baked in with this model
                ultimate measure of success and we need to crystallize a plan
                yet open door policy who is responsible for the ask for this
                request? what do you feel you would bring to the table if you
                were hired for this position. Wiggle room guerrilla marketing
                shelfware. Code feature creep can we parallel path lose client
                to 10:00 meeting hire the best manage expectations
                root-and-branch review.
              </p>
              <button>Click here!</button>
              <h4>Table</h4>
              <table>
                <tr>
                  <td>A1</td>
                  <td>B1</td>
                </tr>
                <tr>
                  <td>A2</td>
                  <td>B2</td>
                </tr>
              </table>
              <hr />
            </>
          )}
        </Process.Step>
        <Process.Step title="Vedlegg" timestamp={getDateAfter(12)}>
          Send inn vedlegg
        </Process.Step>
        <Process.Step title="Oppsummering" timestamp={getDateAfter(15)}>
          Les oppsummering
        </Process.Step>
        <Process.Step title="Innsending" timestamp={getDateAfter(18)}>
          Send inn søknaden
        </Process.Step>
      </Process>
    </div>
  );
};
Default.argTypes = {
  activeStep: {
    name: "'activeStep'-prop",
    control: "inline-radio",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  step4Title: { name: "Step 4: 'title'-prop" },
  step4Date: { name: "Step 4: 'date'-prop" },
  step4ShowSlot: { name: "Step 4: Add dummy slot" },
  step4Icon: {
    name: "Step 4: 'icon'-prop",
    control: "inline-radio",
    options: ["<Icon/>", "<empty string>", undefined],
  },

  step4HideContent: {
    name: "Step 4: 'hideContent'-prop",
    control: "inline-radio",
    options: [true, false, undefined],
  },
};
Default.args = {
  activeStep: 3,
  step4Title:
    "Søknadstekst for en veldig spesifikk prosess i Nav som må beskrives og forklares i sitt fulle i denne labelen",
  step4Date: getDateAfter(9),
  step4ShowSlot: true,
  step4Icon: "<Icon/>",
  step4HideContent: undefined,
  endless: false,
};

export const NumberedBullets: StoryFn<Story> = () => {
  return (
    <Process activeStep={3}>
      <Process.Step bullet={0} title="Start søknad" />
      <Process.Step bullet={1} title="Personopplysninger" />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={2} title="Saksopplysninger" />

      <Process.Step
        bullet={3}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={4} title="Vedlegg" />
      <Process.Step bullet={5} title="Oppsummering" />
    </Process>
  );
};

export const IconBullets: StoryFn<Story> = () => {
  return (
    <Process activeStep={3}>
      <Process.Step bullet={<SparklesFillIcon />} title="Start søknad" />
      <Process.Step bullet={<SparklesFillIcon />} title="Personopplysninger" />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Saksopplysninger" />

      <Process.Step
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Step bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  );
};

export const LineVariants: StoryFn<Story> = () => {
  return (
    <Process activeStep={3}>
      <Process.Step bullet={<SparklesFillIcon />} title="Start søknad" />
      <Process.Step
        bullet={<SparklesFillIcon />}
        title="Personopplysninger"
        lineVariant="dashed"
      />
      <Process.Step title="Substep 1" lineVariant="dashed" />
      <Process.Step title="Substep 2" lineVariant="dashed" />
      <Process.Step title="Substep 3" lineVariant="dashed" />
      <Process.Step bullet={<SparklesFillIcon />} title="Saksopplysninger" />

      <Process.Step
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Step bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  );
};

export const Content: StoryFn<Story> = () => {
  return (
    <Process activeStep={3}>
      <Process.Step bullet={<SparklesFillIcon />} title="Start søknad">
        <ContentOne />
      </Process.Step>
      <Process.Step bullet={<SparklesFillIcon />} title="Personopplysninger" />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Saksopplysninger" />

      <Process.Step
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      >
        <ContentTwo />
      </Process.Step>
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Step bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  );
};

export const InteractiveDemo: StoryFn<Story> = () => {
  const [activeStep, setActiveStep] = React.useState(0);

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

  return (
    <Process activeStep={activeStep > 1 ? activeStep + 2 : activeStep}>
      <Process.Step
        bullet={isDone(0) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step one"
        timestamp={getDateAfter(3)}
      >
        {activeStep === 0 && (
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
        )}
      </Process.Step>
      <Process.Step
        bullet={isDone(1) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step two"
        timestamp={getDateAfter(2)}
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
      </Process.Step>
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step
        bullet={isDone(2) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step three"
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
      </Process.Step>

      <Process.Step
        bullet={isDone(3) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step four"
        timestamp={getDateAfter(1)}
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
      </Process.Step>
      <Process.Step
        bullet={isDone(4) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step five"
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
      </Process.Step>
      <Process.Step
        bullet={isDone(5) ? <CheckmarkIcon /> : <SparklesFillIcon />}
        title="Step six"
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
      </Process.Step>
    </Process>
  );
};

export const ReverseActiveOrder: StoryFn<Story> = () => {
  return (
    <Process activeStep={3} reverseActiveDirection>
      <Process.Step bullet={<SparklesFillIcon />} title="Start søknad" />
      <Process.Step bullet={<SparklesFillIcon />} title="Personopplysninger" />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Saksopplysninger" />

      <Process.Step
        bullet={<SparklesFillIcon />}
        title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
      />
      <Process.Step title="Substep 1" />
      <Process.Step title="Substep 2" />
      <Process.Step title="Substep 3" />
      <Process.Step bullet={<SparklesFillIcon />} title="Vedlegg" />
      <Process.Step bullet={<SparklesFillIcon />} title="Oppsummering" />
    </Process>
  );
};

export const Chromatic: Story = {
  render: () => <VStack gap="4">TEMP</VStack>,
  parameters: {
    chromatic: { disable: false },
  },
};

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
