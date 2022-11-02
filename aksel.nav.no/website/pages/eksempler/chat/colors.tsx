import { Chat } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-10">
      <Chat
        avatar="EVA"
        name="EVA"
        timestamp="01.01.21 14:00"
        avatarBgColor="rgba(255, 236, 204, 1)"
        backgroundColor="rgba(255, 249, 240, 1)"
      >
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        avatar="NO"
        name="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
        avatarBgColor="rgba(204, 225, 255, 1)"
        backgroundColor="rgba(230, 240, 255, 1)"
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

export const args = {
  index: 1,
};
