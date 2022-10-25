import { Caseworker, ExternalLink, Money, Telephone } from "@navikt/ds-icons";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { Timeline } from ".";
import { Link, Tag } from "..";
import { BodyShort } from "../typography";

export default {
  title: "ds-react/Timeline",
  component: Timeline,
  argTypes: {
    activeStep: {
      control: {
        type: "number",
      },
    },
  },
} as Meta;

/* const storyTexts = [
  "Minimize backwards overflow agile. Horsehead offer commitment to the cause nor copy and paste from stack overflow problem territories, innovation is hot right now for can you slack it to me?. High touch client table the discussion , and get buy-in so manage expectations loop back, please advise soonest. We need a paradigm shift dogpile that, and i need to pee and then go to another meeting for let's prioritize the low-hanging fruit.",
  "Customer centric sorry i didn't get your email proceduralize, and first-order optimal strategies. I dont care if you got some copy, why you dont use officeipsumcom or something like that ? wheelhouse. Viral engagement new economy, this proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables Bob called an all-hands this afternoon. Fire up your browser touch base innovation is hot right now so this medium needs to be more dynamic.",
  "Touch base define the underlying principles that drive decisions and strategy for your design language. I have zero cycles for this. Cadence social currency, for low engagement execute . Deliverables rehydrate the team or let's circle back to that those options are already baked in with this model teams were able to drive adoption and awareness we need to start advertising on social media circle back. Through the lens of face time.",
  "Take five, punch the tree, and come back in here with a clear head those options are already baked in with this model ultimate measure of success and we need to crystallize a plan yet open door policy who's responsible for the ask for this request? what do you feel you would bring to the table if you were hired for this position. Wiggle room guerrilla marketing shelfware. Code feature creep can we parallel path lose client to 10:00 meeting hire the best manage expectations root-and-branch review.",
  "Curate downselect tread it daily cc me on that due diligence, or close the loop. All hands on deck my supervisor didn't like the latest revision you gave me can you switch back to the first revision? ping me or game-plan, yet make it a priority, on this journey win-win. Our competitors are jumping the shark we need to build it so that it scales post launch future-proof can we align on lunch orders. Deliverables message the initiative.",
  "Out of scope poop, so pre launch. I just wanted to give you a heads-up wiggle room cc me on that I have been doing some research this morning and we need to better, nor dog and pony show prioritize these line items so UX. Big data upstream selling circle back, in an ideal world. Get all your ducks in a row land it in region so code so one-sheet. Action item we need to think big start small and scale fast to energize our clients. Cta due diligence, for this vendor is incompetent nor forcing function and circle back and low engagement.",
  "Move the needle a loss a day will keep you focus yet can you put it into a banner that is not alarming, but eye catching and not too giant or strategic fit, nor it is all exactly as i said, but i don't like it or streamline. We've bootstrapped the model. This proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables the horse is out of the barn usabiltiy, for going forward but going forward.",
]; */

export const Default = ({ asButton, ...props }) => {
  /* const [activeStep, setActiveStep] = useState(1); */

  return (
    <div style={{ display: "flex", gap: "10rem", flexDirection: "column" }}>
      <Timeline aria-labelledby="Timeline-heading" activeStep={3} {...props}>
        <Timeline.Status
          title="Du har søkt om dagpenger"
          time="past"
          description="1 uke siden"
          variant="success"
        />
        <Timeline.Info
          time="past"
          icon={Caseworker}
          title="Veileder gikk gjennom søknaden"
          description="For 3 dager siden"
        />
        <Timeline.Status
          title="Søkanden mangler dokumenter"
          time="present"
          description="Du er her 23. Oktober 2022"
          variant="warning"
        >
          <BodyShort spacing>
            Du mangler fortsatt noen dokumenter til søknaden
          </BodyShort>
          <BodyShort spacing>
            <Link href="#">
              Gå til oversikt over dokumenter <ExternalLink aria-hidden />
            </Link>
          </BodyShort>
          <Tag variant="warning">Mangler dokumenter</Tag>
        </Timeline.Status>
        <Timeline.Info
          time="future"
          icon={Telephone}
          title="Du vil få en telefon fra en veileder"
          description="Om omtrent 2 dager"
        />
        <Timeline.Info
          time="future"
          icon={Money}
          title="Du vil få utbetalt dagpenger"
          description="Når søknaden er godkjent"
        >
          <BodyShort spacing>
            Utbetaling vil gjennomføres til kontonummer lagret under "Mine
            opplysninger"
          </BodyShort>
          <BodyShort spacing>
            <Link href="#">
              Se mine opplysninger <ExternalLink aria-hidden />
            </Link>
          </BodyShort>
        </Timeline.Info>
      </Timeline>
    </div>
  );
};
