import { Chat, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-40">
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
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { background: "subtle" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Unngå lik bakgrunnsfarge i komponenten som på flaten bak.",
};
