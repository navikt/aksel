import { Chat, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-40">
      <Chat avatar="EVA" name="EVA" timestamp="01.01.21 14:00">
        <Chat.Bubble toptextPosition="right">
          Hei! Mitt navn er Eva. Hva kan jeg hjelpe deg med?
        </Chat.Bubble>
      </Chat>
      <Chat
        avatar="ON"
        name="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
        toptextPosition="left"
      >
        <Chat.Bubble>
          Hei Eva. Hvor sjekker jeg statusen på foreldrepengersøknaden min?
        </Chat.Bubble>
      </Chat>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Noen ganger ønsker man mer fleksibilitet for plassering av navn + tid i chatboblen.",
};
