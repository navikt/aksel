import { withDsExample } from "@/web/examples/withDsExample";
import { PersonHeadsetIcon, PersonIcon } from "@navikt/aksel-icons";
import { Chat } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-10">
      <Chat
        avatar={<PersonHeadsetIcon />}
        name="EVA"
        timestamp="01.01.21 14:00"
      >
        <Chat.Bubble>Hei! Mitt navn er Eva.</Chat.Bubble>
        <Chat.Bubble>Hva kan jeg hjelpe deg med?</Chat.Bubble>
      </Chat>
      <Chat
        avatar={<PersonIcon />}
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
