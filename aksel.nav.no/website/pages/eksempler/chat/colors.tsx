import { withDsExample } from "@/web/examples/withDsExample";
import { Chat } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-10">
      <Chat avatar="EVA" name="EVA" timestamp="01.01.21 14:00" variant="info">
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        name="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
        variant="subtle"
      >
        <Chat.Bubble>Hei Eva.</Chat.Bubble>
        <Chat.Bubble>
          Hvor sjekker jeg statusen på foreldrepengersøknaden min?
        </Chat.Bubble>
      </Chat>
    </div>
  );
};

export default withDsExample(Example, { variant: "subtle" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Unngå lik bakgrunnsfarge i komponenten som på flaten bak.",
};
