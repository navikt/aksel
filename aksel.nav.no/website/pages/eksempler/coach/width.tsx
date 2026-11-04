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
            title: "Medium bredde",
            description:
              "Standard bredde for dialogen i en Coach for de fleste brukstilfeller.",
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: mediumRef,
            title: "Medium bredde",
            description:
              "Standard bredde for anchor i en Coach for de fleste brukstilfeller.",
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
            width: "small",
            title: "Liten bredde",
            description: "En smal bredde for dialogen i en Coach.",
          },
          {
            id: "step-2",
            type: "anchor",
            width: "small",
            anchorRef: smallRef,
            title: "Liten bredde",
            description: "En smal bredde for anchor i en Coach.",
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
  index: 2,
};
