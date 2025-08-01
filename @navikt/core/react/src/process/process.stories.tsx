import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  CalculatorFillIcon,
  CaptionsIcon,
  FileCheckmarkIcon,
  GavelSoundBlockIcon,
  NotePencilIcon,
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

export const Default = ({
  activeStep,
  completedIcon,
  uncompletedIcon,
  step4Title,
  step4Date,
  step4Description,
  step4Variant,
  step4Number,
  step4HideLine,
  step4Icon,
  ...props
}) => {
  const newProps = {
    onClick: (e) => e.preventDefault(),
    ...{ href: "#" },
  };

  return (
    <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
      <Process
        activeStep={activeStep}
        completedIcon={
          completedIcon === "<Icon/>" ? <FileCheckmarkIcon /> : completedIcon
        }
        uncompletedIcon={
          uncompletedIcon === "<Icon/>" ? <NotePencilIcon /> : uncompletedIcon
        }
        {...props}
      >
        <Process.Step {...newProps} title="Start søknad" />
        <Process.Step {...newProps} title="Personopplysninger" />
        <Process.Step {...newProps} title="Saksopplysninger" />
        <Process.Step
          {...newProps}
          title={step4Title}
          date={step4Date}
          description={step4Description}
          variant={step4Variant}
          icon={step4Icon === "<Icon/>" ? <GavelSoundBlockIcon /> : step4Icon}
          number={step4Number}
          hideLine={step4HideLine}
        >
          <h2>Heading 2</h2>
          <p>
            Paragraph. Take five, punch the tree, and come back in here with a
            clear head those options are already baked in with this model
            ultimate measure of success and we need to crystallize a plan yet
            open door policy who is responsible for the ask for this request?
            what do you feel you would bring to the table if you were hired for
            this position. Wiggle room guerrilla marketing shelfware. Code
            feature creep can we parallel path lose client to 10:00 meeting hire
            the best manage expectations root-and-branch review.
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
        </Process.Step>
        <Process.Step {...newProps} title="Vedlegg" />
        <Process.Step {...newProps} title="Oppsummering" />
        <Process.Step {...newProps} title="Innsending" />
      </Process>
    </div>
  );
};
Default.argTypes = {
  variant: {
    control: "inline-radio",
    options: ["default", "icon", "number"],
  },
  activeStep: {
    control: "inline-radio",
    options: [1, 2, 3, 4, 5, 6, 7],
  },
  completedIcon: {
    control: "inline-radio",
    options: ["<Icon/>", "empty string", undefined],
  },
  uncompletedIcon: {
    control: "inline-radio",
    options: ["<Icon/>", "empty string", undefined],
  },
  step4Title: { name: "Step 4: Title" },
  step4Date: { name: "Step 4: Date" },
  step4Description: { name: "Step 4: Description" },
  step4HideLine: { name: "Step 4: Hide line" },
  step4Variant: {
    name: "Step 4: Variant",
    control: "inline-radio",
    options: ["default", "icon", "number", undefined],
  },
  step4Number: {
    name: "Step 4: Number",
    control: "select",
    options: [undefined, -5, 1, 2, 3, 4, 9, 11, 345],
  },
  step4Icon: {
    name: "Step 4: Icon",
    control: "inline-radio",
    options: ["<Icon/>", "empty string", undefined],
  },
};
Default.args = {
  variant: "default",
  activeStep: 3,
  completedIcon: undefined,
  uncompletedIcon: undefined,
  step4Title:
    "Søknadstekst for en veldig spesifikk prosess i Nav som må beskrives og forklares i sitt fulle i denne labelen",
  step4Date: new Date().toDateString(),
  step4Description:
    "Description of customer centric sorry i didn't get your email proceduralize, and first-order optimal strategies. I dont care if you got some copy, why you dont use officeipsumcom or something like that ? wheelhouse. Viral engagement new economy, this proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables Bob called an all-hands this afternoon. Fire up your browser touch base innovation is hot right now so this medium needs to be more dynamic.",
  step4HideLine: true,
  step4Variant: "default",
  step4Number: 9,
  step4Icon: "<Icon/>",
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
        <h3>Process-icons</h3>
        <Process
          activeStep={activeStep}
          variant="icon"
          completedIcon={<FileCheckmarkIcon />}
          uncompletedIcon={<NotePencilIcon />}
        >
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
        <Process
          activeStep={activeStep}
          variant="icon"
          completedIcon={<FileCheckmarkIcon />}
          uncompletedIcon={<NotePencilIcon />}
        >
          <Process.Step {...props} title="Process-level completed icon" />
          <Process.Step {...props} title="Process-level completed icon" />
          <Process.Step
            {...props}
            icon={<CalculatorFillIcon />}
            title="Step override"
          />
          <Process.Step
            {...props}
            title="Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst"
          />
          <Process.Step
            {...props}
            icon={<PaperclipIcon />}
            title="Step override"
          />
          <Process.Step {...props} icon="" title="Step override (blank)" />
          <Process.Step {...props} title="Process-level uncompleted icon" />
        </Process>
      </div>
    </div>
  );
};

// TODO (stw): data-color is overridden inside Process because it currently uses data-color='info' to conform with Figma-sketches
export const ColorRole = () => (
  <div data-color="brand-magenta">
    <Variants />
  </div>
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
