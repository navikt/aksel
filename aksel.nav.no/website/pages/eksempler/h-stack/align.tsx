import { withDsExample } from "@/web/examples/withDsExample";
import { HStack, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
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
  );
};

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Endrer 'align-items'.",
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
