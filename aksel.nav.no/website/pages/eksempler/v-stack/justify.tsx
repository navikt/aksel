import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex h-72 bg-deepblue-50">
      <HStack gap="2" wrap={false}>
        <VStack justify="center">
          <Placeholder text="center" />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="end">
          <Placeholder text="end" />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="start">
          <Placeholder text="start" />
        </VStack>
        <Divider />
        <VStack justify="space-around">
          <Placeholder text="around" />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="space-between">
          <Placeholder text="between" />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="space-evenly">
          <Placeholder text="evenly" />
          <Placeholder />
        </VStack>
      </HStack>
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

const Divider = () => {
  return <hr className="m-0 h-full border-r border-r-border-divider" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Endrer 'justify-content'.",
};
