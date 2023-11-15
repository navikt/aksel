import { withDsExample } from "@/web/examples/withDsExample";
import { Chat } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-10">
      <Chat avatar="EVA" name="EVA" timestamp="01.01.21 14:00">
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        avatar="ON"
        name="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
      >
        <Chat.Bubble>Hei Eva.</Chat.Bubble>
        <Chat.Bubble>
          Hvor sjekker jeg statusen på foreldrepengersøknaden min?
        </Chat.Bubble>
      </Chat>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
