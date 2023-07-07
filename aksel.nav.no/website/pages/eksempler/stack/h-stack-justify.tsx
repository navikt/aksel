import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

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

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Endrer CSS på 'justify-content'.",
};

const Placeholder = ({
  text,
  noPadding,
}: {
  text?: string;
  noPadding?: boolean;
}) => {
  return (
    <div
      className="min-h-4 text-text-on-action h-auto w-auto rounded bg-teal-600 p-2"
      style={{ padding: noPadding && 0 }}
    >
      {text}
    </div>
  );
};
