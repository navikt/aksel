import { useRef } from "react";
import { Button, Coach, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const mediumRef = useRef<HTMLButtonElement>(null);
  const smallRef = useRef<HTMLButtonElement>(null);

  return (
    <HStack gap="space-16">
      <Coach
        steps={[
          {
            id: "step-1",
            type: "dialog",
            title: "Medium størrelse",
            description:
              "Dette er standard størrelse for dialogen i en Coach med normal padding og tekststørrelse.",
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: mediumRef,
            title: "Medium størrelse",
            description:
              "Dette er standard størrelse for anchor i en Coach med normal padding og tekststørrelse.",
          },
        ]}
      >
        <Coach.Mark>
          <Button ref={mediumRef}>Medium (standard)</Button>
        </Coach.Mark>
      </Coach>
      <Coach
        steps={[
          {
            id: "step-1",
            type: "dialog",
            size: "small",
            title: "Liten størrelse",
            description:
              "Dette er liten størrelse for dialogen i en Coach med mindre padding og tekststørrelse.",
          },
          {
            id: "step-2",
            type: "anchor",
            size: "small",
            anchorRef: smallRef,
            title: "Liten størrelse",
            description:
              "Dette er liten størrelse for anchor i en Coach med mindre padding og tekststørrelse.",
          },
        ]}
      >
        <Coach.Mark>
          <Button ref={smallRef}>Small</Button>
        </Coach.Mark>
      </Coach>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 1,
};
