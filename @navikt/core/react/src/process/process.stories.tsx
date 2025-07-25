import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { VStack } from "../layout/stack";
import { BodyLong } from "../typography";
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

const storyTexts = [
  "Minimize backwards overflow agile. Horsehead offer commitment to the cause nor copy and paste from stack overflow problem territories, innovation is hot right now for can you slack it to me?. High touch client table the discussion , and get buy-in so manage expectations loop back, please advise soonest. We need a paradigm shift dogpile that, and i need to pee and then go to another meeting for let's prioritize the low-hanging fruit.",
  "Customer centric sorry i didn't get your email proceduralize, and first-order optimal strategies. I dont care if you got some copy, why you dont use officeipsumcom or something like that ? wheelhouse. Viral engagement new economy, this proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables Bob called an all-hands this afternoon. Fire up your browser touch base innovation is hot right now so this medium needs to be more dynamic.",
  "Touch base define the underlying principles that drive decisions and strategy for your design language. I have zero cycles for this. Cadence social currency, for low engagement execute . Deliverables rehydrate the team or let's circle back to that those options are already baked in with this model teams were able to drive adoption and awareness we need to start advertising on social media circle back. Through the lens of face time.",
  "Take five, punch the tree, and come back in here with a clear head those options are already baked in with this model ultimate measure of success and we need to crystallize a plan yet open door policy who's responsible for the ask for this request? what do you feel you would bring to the table if you were hired for this position. Wiggle room guerrilla marketing shelfware. Code feature creep can we parallel path lose client to 10:00 meeting hire the best manage expectations root-and-branch review.",
  "Curate downselect tread it daily cc me on that due diligence, or close the loop. All hands on deck my supervisor didn't like the latest revision you gave me can you switch back to the first revision? ping me or game-plan, yet make it a priority, on this journey win-win. Our competitors are jumping the shark we need to build it so that it scales post launch future-proof can we align on lunch orders. Deliverables message the initiative.",
  "Out of scope poop, so pre launch. I just wanted to give you a heads-up wiggle room cc me on that I have been doing some research this morning and we need to better, nor dog and pony show prioritize these line items so UX. Big data upstream selling circle back, in an ideal world. Get all your ducks in a row land it in region so code so one-sheet. Action item we need to think big start small and scale fast to energize our clients. Cta due diligence, for this vendor is incompetent nor forcing function and circle back and low engagement.",
  "Move the needle a loss a day will keep you focus yet can you put it into a banner that is not alarming, but eye catching and not too giant or strategic fit, nor it is all exactly as i said, but i don't like it or streamline. We've bootstrapped the model. This proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables the horse is out of the barn usabiltiy, for going forward but going forward.",
];

export const Default = ({ asButton, completed, ...props }) => {
  const [activeStep, setActiveStep] = useState(3);

  const newProps = {
    onClick: (e) => e.preventDefault(),
    ...(asButton ? { as: "button" } : { href: "#" }),
  };

  return (
    <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
      <Process activeStep={activeStep} onStepChange={setActiveStep} {...props}>
        <Process.Step {...newProps} completed={completed}>
          Start søknad
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Personopplysninger
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Saksopplysninger
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Søknadstekst for en veldig spesifikk prosess i Nav som må beskrives og
          forklares i sitt fulle i denne labelen
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Vedlegg
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Oppsummering
        </Process.Step>
        <Process.Step {...newProps} completed={completed}>
          Innsending
        </Process.Step>
      </Process>
      <BodyLong style={{ marginTop: "5rem" }}>
        {storyTexts[activeStep]}
      </BodyLong>
    </div>
  );
};
Default.argTypes = {
  activeStep: {
    control: { type: "number" },
  },
};
Default.args = {
  asButton: false,
  interactive: true,
  completed: false,
};

export const Vertical: StoryFn<Story> = () => {
  const [activeStep, setActiveStep] = useState(2);
  const props = { onClick: (e) => e.preventDefault(), href: "#" };
  return (
    <Process activeStep={activeStep} onStepChange={setActiveStep}>
      <Process.Step {...props}>Start søknad</Process.Step>
      <Process.Step {...props}>Personopplysninger</Process.Step>
      <Process.Step {...props}>Saksopplysninger</Process.Step>
      <Process.Step {...props}>
        Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst
      </Process.Step>
      <Process.Step {...props}>Vedlegg</Process.Step>
      <Process.Step {...props}>Oppsummering</Process.Step>
      <Process.Step {...props}>Innsending</Process.Step>
    </Process>
  );
};

export const DisplayOnly: StoryFn<Story> = () => {
  return (
    <div className="colgap">
      <Process activeStep={2} interactive={false}>
        <Process.Step completed>Start søknad</Process.Step>
        <Process.Step completed>Personopplysninger</Process.Step>
        <Process.Step>Saksopplysninger</Process.Step>
        <Process.Step>
          Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst
        </Process.Step>
        <Process.Step>Vedlegg</Process.Step>
        <Process.Step>Oppsummering</Process.Step>
        <Process.Step>Innsending</Process.Step>
      </Process>
      <Process activeStep={3} interactive={false}>
        <Process.Step completed>Start søknad</Process.Step>
        <Process.Step completed>Personopplysninger</Process.Step>
        <Process.Step>Saksopplysninger</Process.Step>
        <Process.Step>
          Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst
        </Process.Step>
        <Process.Step>Vedlegg</Process.Step>
        <Process.Step>Oppsummering</Process.Step>
        <Process.Step>Innsending</Process.Step>
      </Process>
    </div>
  );
};

export const CompletedSteps: StoryFn<Story> = () => {
  const [activeStep, setActiveStep] = useState(3);
  return (
    <div className="colgap">
      <Process
        activeStep={activeStep}
        onStepChange={(step) => setActiveStep(step)}
      >
        <Process.Step completed={activeStep > 1}>Start søknad</Process.Step>
        <Process.Step completed>Personopplysninger</Process.Step>
        <Process.Step completed={activeStep > 3}>Saksopplysninger</Process.Step>
        <Process.Step completed={activeStep >= 4}>
          Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst
        </Process.Step>
        <Process.Step completed={activeStep > 5} interactive={false}>
          Vedlegg
        </Process.Step>
        <Process.Step completed={activeStep > 6}>Oppsummering</Process.Step>
        <Process.Step completed={activeStep > 7}>Innsending</Process.Step>
      </Process>
      <Process
        activeStep={activeStep - 1}
        onStepChange={(step) => setActiveStep(step)}
      >
        <Process.Step completed={activeStep > 1}>Start søknad</Process.Step>
        <Process.Step completed={activeStep > 2}>
          Personopplysninger
        </Process.Step>
        <Process.Step completed={activeStep > 3}>Saksopplysninger</Process.Step>
        <Process.Step completed={activeStep >= 4}>
          Søknadstekst for en veldig spesifikk prosess i Nav som har lang tekst
        </Process.Step>
        <Process.Step completed={activeStep > 5}>Vedlegg</Process.Step>
        <Process.Step completed={activeStep > 6}>Oppsummering</Process.Step>
        <Process.Step completed={activeStep > 7}>Innsending</Process.Step>
      </Process>
    </div>
  );
};

export const ColorRole = () => (
  <div data-color="brand-magenta">
    <Vertical />
  </div>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4">
      <div>
        <h2>Vertical</h2>
        <Vertical />
      </div>
      <div>
        <h2>Display only</h2>
        <DisplayOnly />
      </div>
      <div>
        <h2>Completed steps</h2>
        <CompletedSteps />
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
