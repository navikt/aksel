import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  CalculatorFillIcon,
  CaptionsIcon,
  GavelSoundBlockIcon,
  PaperclipIcon,
  PaperplaneIcon,
  TasklistStartFillIcon,
  WalletFillIcon,
} from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import Process from "./Process";

const meta: Meta<typeof Process> = {
  title: "ds-react/Process",
  component: Process,
  parameters: {
    chromatic: { disable: true },
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
  step4Completed,
  ...props
}) => {
  return (
    <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
      <Process activeStep={activeStep} {...props}>
        <Process.Step title="Start søknad" date={getDateAfter(0)} />
        <Process.Step title="Personopplysninger" date={getDateAfter(3)}>
          Send inn personopplysninger
        </Process.Step>
        <Process.Step title="Saksopplysninger" date={getDateAfter(6)}>
          Send inn saksopplysninger
        </Process.Step>
        <Process.Step
          title={step4Title}
          date={step4Date}
          icon={
            step4Icon === "<Icon/>" ? (
              <GavelSoundBlockIcon />
            ) : step4Icon === "<empty string>" ? (
              ""
            ) : (
              step4Icon
            )
          }
          completed={step4Completed}
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
        <Process.Step title="Vedlegg" date={getDateAfter(12)}>
          Send inn vedlegg
        </Process.Step>
        <Process.Step title="Oppsummering" date={getDateAfter(15)}>
          Les oppsummering
        </Process.Step>
        <Process.Step title="Innsending" date={getDateAfter(18)}>
          Send inn søknaden
        </Process.Step>
      </Process>
    </div>
  );
};
Default.argTypes = {
  variant: {
    name: "'variant'-prop",
    control: "inline-radio",
    options: ["default", "icon", "number"],
  },
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
  step4Completed: {
    name: "Step 4: 'completed'-prop",
    control: "inline-radio",
    options: [true, false, undefined],
  },
};
Default.args = {
  variant: "default",
  activeStep: 3,
  step4Title:
    "Søknadstekst for en veldig spesifikk prosess i Nav som må beskrives og forklares i sitt fulle i denne labelen",
  step4Date: getDateAfter(9),
  step4ShowSlot: true,
  step4Icon: "<Icon/>",
  step4Completed: undefined,
};

export const Variants: StoryFn<Story> = () => {
  const [activeStep] = useState(2);
  const props = { onClick: (e) => e.preventDefault(), href: "#" };
  return (
    <div style={{ display: "flex", gap: "4rem" }}>
      <div>
        <h3>default</h3>
        <Process activeStep={activeStep}>
          <Process.Step {...props} title="Start søknad" />
          <Process.Step {...props} title="Personopplysninger" />
          <Process.Step {...props} title="Saksopplysninger" />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step {...props} title="Vedlegg" />
          <Process.Step {...props} title="Oppsummering" />
          <Process.Step {...props} title="Innsending" />
        </Process>
      </div>

      <div>
        <h3>number</h3>
        <Process variant="number" activeStep={activeStep}>
          <Process.Step {...props} title="Start søknad" />
          <Process.Step {...props} title="Personopplysninger" />
          <Process.Step {...props} title="Saksopplysninger" />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step {...props} title="Vedlegg" />
          <Process.Step {...props} title="Oppsummering" />
          <Process.Step {...props} title="Innsending" />
        </Process>
      </div>
      <div>
        <h3>icon</h3>
        <Process variant="icon" activeStep={activeStep}>
          <Process.Step {...props} title="Start søknad" />
          <Process.Step {...props} title="Personopplysninger" />
          <Process.Step {...props} title="Saksopplysninger" />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step {...props} title="Vedlegg" />
          <Process.Step {...props} title="Oppsummering" />
          <Process.Step {...props} title="Innsending" />
        </Process>
      </div>
    </div>
  );
};

export const Icons: StoryFn<Story> = () => {
  const [activeStep] = useState(4);
  const props = { onClick: (e) => e.preventDefault(), href: "#" };
  return (
    <div style={{ display: "flex", gap: "4rem" }}>
      <div>
        <h3>Default icons</h3>
        <Process activeStep={activeStep} variant="icon">
          <Process.Step {...props} title="Start søknad" />
          <Process.Step {...props} title="Personopplysninger" />
          <Process.Step {...props} title="Saksopplysninger" />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step {...props} title="Vedlegg" />
          <Process.Step {...props} title="Oppsummering" />
          <Process.Step {...props} title="Innsending" />
        </Process>
      </div>

      <div>
        <h3>Step-icons</h3>
        <Process activeStep={activeStep} variant="icon">
          <Process.Step
            {...props}
            icon={<TasklistStartFillIcon />}
            title="Start søknad"
          />
          <Process.Step
            {...props}
            icon={<WalletFillIcon />}
            title="Personopplysninger"
          />
          <Process.Step
            {...props}
            icon={<GavelSoundBlockIcon />}
            title="Saksopplysninger"
          />
          <Process.Step
            {...props}
            icon={<CaptionsIcon />}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step {...props} icon={<PaperclipIcon />} title="Vedlegg" />
          <Process.Step
            {...props}
            icon={<CalculatorFillIcon />}
            title="Oppsummering"
          />
          <Process.Step
            {...props}
            icon={<PaperplaneIcon />}
            title="Innsending"
          />
        </Process>
      </div>

      <div>
        <h3>Mix</h3>
        <Process activeStep={activeStep} variant="icon">
          <Process.Step {...props} title="Process-level completed icon" />
          <Process.Step {...props} title="Process-level completed icon" />
          <Process.Step {...props} icon="" title="Step override (blank)" />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step
            {...props}
            icon={<PaperclipIcon />}
            title="Step override"
          />
          <Process.Step
            {...props}
            icon={<CalculatorFillIcon />}
            title="Step override"
          />
          <Process.Step {...props} title="Process-level uncompleted icon" />
        </Process>
      </div>
    </div>
  );
};

export const ColorRole = () => (
  <Process data-color="brand-magenta" variant="icon" activeStep={4}>
    <Process.Step title="Start søknad" />
    <Process.Step title="Personopplysninger" />
    <Process.Step title="Saksopplysninger" />
    <Process.Step title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst" />
    <Process.Step title="Vedlegg" />
    <Process.Step title="Oppsummering" />
    <Process.Step title="Innsending" />
  </Process>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4">
      <div>
        <h2>Variants</h2>
        <Variants />
      </div>
      <div>
        <h2>Icons</h2>
        <Icons />
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
