/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { BodyLong } from "..";
import Stepper from "./Stepper";

export default {
  title: "ds-react/Stepper",
  component: Stepper,
  argTypes: {
    orientation: {
      control: {
        type: "radio",
      },
      options: ["horizontal", "vertical"],
    },
    activeStep: {
      control: {
        type: "number",
      },
    },
  },
} as Meta;

const storyTexts = [
  "Minimize backwards overflow agile. Horsehead offer commitment to the cause nor copy and paste from stack overflow problem territories, innovation is hot right now for can you slack it to me?. High touch client table the discussion , and get buy-in so manage expectations loop back, please advise soonest. We need a paradigm shift dogpile that, and i need to pee and then go to another meeting for let's prioritize the low-hanging fruit.",
  "Customer centric sorry i didn't get your email proceduralize, and first-order optimal strategies. I dont care if you got some copy, why you dont use officeipsumcom or something like that ? wheelhouse. Viral engagement new economy, this proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables Bob called an all-hands this afternoon. Fire up your browser touch base innovation is hot right now so this medium needs to be more dynamic.",
  "Touch base define the underlying principles that drive decisions and strategy for your design language. I have zero cycles for this. Cadence social currency, for low engagement execute . Deliverables rehydrate the team or let's circle back to that those options are already baked in with this model teams were able to drive adoption and awareness we need to start advertising on social media circle back. Through the lens of face time.",
  "Take five, punch the tree, and come back in here with a clear head those options are already baked in with this model ultimate measure of success and we need to crystallize a plan yet open door policy who's responsible for the ask for this request? what do you feel you would bring to the table if you were hired for this position. Wiggle room guerrilla marketing shelfware. Code feature creep can we parallel path lose client to 10:00 meeting hire the best manage expectations root-and-branch review.",
  "Curate downselect tread it daily cc me on that due diligence, or close the loop. All hands on deck my supervisor didn't like the latest revision you gave me can you switch back to the first revision? ping me or game-plan, yet make it a priority, on this journey win-win. Our competitors are jumping the shark we need to build it so that it scales post launch future-proof can we align on lunch orders. Deliverables message the initiative.",
  "Out of scope poop, so pre launch. I just wanted to give you a heads-up wiggle room cc me on that I have been doing some research this morning and we need to better, nor dog and pony show prioritize these line items so UX. Big data upstream selling circle back, in an ideal world. Get all your ducks in a row land it in region so code so one-sheet. Action item we need to think big start small and scale fast to energize our clients. Cta due diligence, for this vendor is incompetent nor forcing function and circle back and low engagement.",
  "Move the needle a loss a day will keep you focus yet can you put it into a banner that is not alarming, but eye catching and not too giant or strategic fit, nor it is all exactly as i said, but i don't like it or streamline. We've bootstrapped the model. This proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables the horse is out of the barn usabiltiy, for going forward but going forward.",
];

export const Default = {
  render: ({ asButton, ...props }) => {
    const [activeStep, setActiveStep] = useState(1);

    const newProps = {
      onClick: (e) => e.preventDefault(),
      ...(asButton ? { as: "button" } : { href: "#" }),
    };

    return (
      <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
        <Stepper
          aria-labelledby="stepper-heading"
          activeStep={activeStep}
          onStepChange={setActiveStep}
          orientation="vertical"
          {...props}
        >
          <Stepper.Step {...newProps} completed={props.completed}>
            Start søknad
          </Stepper.Step>
          <Stepper.Step {...newProps}>Personopplysninger</Stepper.Step>
          <Stepper.Step {...newProps} completed={props.completed}>
            Saksopplysninger
          </Stepper.Step>
          <Stepper.Step {...newProps} completed={props.completed}>
            Søknadstekst for en veldig spesifikk prosess i NAV som må beskrives
            og forklares i sitt fulle i denne labelen
          </Stepper.Step>
          <Stepper.Step {...newProps}>Vedlegg</Stepper.Step>
          <Stepper.Step {...newProps}>Oppsummering</Stepper.Step>
          <Stepper.Step {...newProps}>Innsending</Stepper.Step>
        </Stepper>
        <BodyLong style={{ marginTop: "5rem" }}>
          {storyTexts[activeStep]}
        </BodyLong>
      </div>
    );
  },

  args: {
    asButton: false,
    interactive: true,
    completed: false,
  },
};

export const Horizontal = () => {
  const [activeStep, setActiveStep] = useState(2);
  const props = { onClick: (e) => e.preventDefault(), href: "#" };
  return (
    <Stepper
      aria-labelledby="stepper-heading"
      activeStep={activeStep}
      onStepChange={setActiveStep}
      orientation="horizontal"
    >
      <Stepper.Step {...props}>Start søknad</Stepper.Step>
      <Stepper.Step {...props}>Personopplysninger</Stepper.Step>
      <Stepper.Step {...props}>Saksopplysninger</Stepper.Step>
      <Stepper.Step {...props}>
        Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
      </Stepper.Step>
      <Stepper.Step {...props}>Vedlegg</Stepper.Step>
      <Stepper.Step {...props}>Oppsummering</Stepper.Step>
      <Stepper.Step {...props}>Innsending</Stepper.Step>
    </Stepper>
  );
};

export const Vertical = () => {
  const [activeStep, setActiveStep] = useState(2);
  const props = { onClick: (e) => e.preventDefault(), href: "#" };
  return (
    <Stepper
      aria-labelledby="stepper-heading"
      activeStep={activeStep}
      onStepChange={setActiveStep}
      orientation="vertical"
    >
      <Stepper.Step {...props}>Start søknad</Stepper.Step>
      <Stepper.Step {...props}>Personopplysninger</Stepper.Step>
      <Stepper.Step {...props}>Saksopplysninger</Stepper.Step>
      <Stepper.Step {...props}>
        Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
      </Stepper.Step>
      <Stepper.Step {...props}>Vedlegg</Stepper.Step>
      <Stepper.Step {...props}>Oppsummering</Stepper.Step>
      <Stepper.Step {...props}>Innsending</Stepper.Step>
    </Stepper>
  );
};

export const DisplayOnly = () => {
  return (
    <div className="colgap">
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={2}
        orientation="vertical"
        interactive={false}
      >
        <Stepper.Step completed>Start søknad</Stepper.Step>
        <Stepper.Step completed>Personopplysninger</Stepper.Step>
        <Stepper.Step>Saksopplysninger</Stepper.Step>
        <Stepper.Step>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </Stepper.Step>
        <Stepper.Step>Vedlegg</Stepper.Step>
        <Stepper.Step>Oppsummering</Stepper.Step>
        <Stepper.Step>Innsending</Stepper.Step>
      </Stepper>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={3}
        orientation="vertical"
        interactive={false}
      >
        <Stepper.Step completed>Start søknad</Stepper.Step>
        <Stepper.Step completed>Personopplysninger</Stepper.Step>
        <Stepper.Step>Saksopplysninger</Stepper.Step>
        <Stepper.Step>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </Stepper.Step>
        <Stepper.Step>Vedlegg</Stepper.Step>
        <Stepper.Step>Oppsummering</Stepper.Step>
        <Stepper.Step>Innsending</Stepper.Step>
      </Stepper>
    </div>
  );
};

export const CompletedSteps = () => {
  const [activeStep, setActiveStep] = useState(3);
  return (
    <div className="colgap">
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        orientation="vertical"
        onStepChange={(step) => setActiveStep(step)}
      >
        <Stepper.Step completed={activeStep > 1}>Start søknad</Stepper.Step>
        <Stepper.Step completed>Personopplysninger</Stepper.Step>
        <Stepper.Step completed={activeStep > 3}>Saksopplysninger</Stepper.Step>
        <Stepper.Step completed={activeStep >= 4}>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </Stepper.Step>
        <Stepper.Step completed={activeStep > 5}>Vedlegg</Stepper.Step>
        <Stepper.Step completed={activeStep > 6}>Oppsummering</Stepper.Step>
        <Stepper.Step completed={activeStep > 7}>Innsending</Stepper.Step>
      </Stepper>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep - 1}
        orientation="vertical"
        onStepChange={(step) => setActiveStep(step)}
      >
        <Stepper.Step completed={activeStep > 1}>Start søknad</Stepper.Step>
        <Stepper.Step completed={activeStep > 2}>
          Personopplysninger
        </Stepper.Step>
        <Stepper.Step completed={activeStep > 3}>Saksopplysninger</Stepper.Step>
        <Stepper.Step completed={activeStep >= 4}>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </Stepper.Step>
        <Stepper.Step completed={activeStep > 5}>Vedlegg</Stepper.Step>
        <Stepper.Step completed={activeStep > 6}>Oppsummering</Stepper.Step>
        <Stepper.Step completed={activeStep > 7}>Innsending</Stepper.Step>
      </Stepper>
    </div>
  );
};
