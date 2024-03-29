import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="min-w-72 bg-deepblue-50">
      <VStack gap="12">
        <HStack gap="3" justify="center">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="end">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="start">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-around">
          <Placeholder text="around" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-between">
          <Placeholder text="between" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-evenly">
          <Placeholder text="evenly" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
      </VStack>
    </div>
  );
};

const Placeholder = ({ text }: { text?: string }) => {
  return (
    <div className="h-auto min-h-4 w-auto rounded bg-teal-600 p-2 text-text-on-action">
      {text}
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Endrer 'justify-content'.",
};
