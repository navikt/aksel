import { PeopleFilled, Service } from "@navikt/ds-icons";
import { Chat } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-10">
      <Chat avatar={<Service />} name="EVA" timestamp="01.01.21 14:00">
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        avatar={<PeopleFilled />}
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

export const args = {
  index: 2,
};
