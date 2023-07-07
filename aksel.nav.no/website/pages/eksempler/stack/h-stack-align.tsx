import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="bg-deepblue-50">
      <VStack gap="12">
        <HStack gap="3" align="center">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" align="end">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" align="start">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" align="stretch">
          <Placeholder text="stretch" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" align="baseline">
          <Placeholder text="baseline" />
          <Placeholder text="text" noPadding />
          <Placeholder text="text" noPadding />
          <Placeholder text="text" noPadding />
          <Placeholder text="text" noPadding />
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
  index: 2,
  desc: "Endrer CSS på 'align-items'.",
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
