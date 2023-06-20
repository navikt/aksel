import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="12">
      <HStack gap="8" align="baseline">
        <Placeholder text="baseline" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="8" align="center">
        <Placeholder text="center" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="2" align="end">
        <Placeholder text="end" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="2" align="start">
        <Placeholder text="start" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="2" align="stretch">
        <Placeholder text="stretch" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
    </VStack>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};

const Placeholder = ({ text }: { text?: string }) => {
  return (
    <div className="min-h-4 text-text-on-action h-auto w-auto rounded bg-teal-600 p-2">
      {text}
    </div>
  );
};
