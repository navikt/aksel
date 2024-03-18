import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="bg-deepblue-50">
      <HStack gap="12">
        <div>
          <VStack gap="3" align="center">
            <Placeholder text="center" />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </VStack>
        </div>
        <div>
          <VStack gap="3" align="end">
            <Placeholder text="end" />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </VStack>
        </div>
        <div>
          <VStack gap="3" align="start">
            <Placeholder text="start" />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </VStack>
        </div>
        <div>
          <VStack gap="3" align="stretch">
            <Placeholder text="stretch" />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </VStack>
        </div>
        <div>
          <VStack gap="3" align="baseline">
            <Placeholder text="baseline" />
            <Placeholder text="text" noPadding />
            <Placeholder text="text" noPadding />
            <Placeholder text="text" noPadding />
          </VStack>
        </div>
      </HStack>
    </div>
  );
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
      className="h-auto min-h-4 w-auto rounded bg-teal-600 text-text-on-action"
      style={{ padding: noPadding ? 0 : "0.5rem" }}
    >
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
  index: 1,
  desc: "Endrer 'align-items'.",
};
