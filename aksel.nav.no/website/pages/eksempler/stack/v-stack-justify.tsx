import { HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="bg-deepblue-50 flex h-72">
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

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Endrer CSS på 'justify-content'.",
};

const Divider = () => {
  return <hr className="border-r-border-divider m-0 h-full border-r" />;
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
