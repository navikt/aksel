import { HStack, Spacer } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Placeholder = ({
  text,
  noPadding,
}: {
  text?: string;
  noPadding?: boolean;
}) => {
  return (
    <div
      className="min-h-8 text-text-on-action aspect-square h-auto w-auto rounded bg-teal-600 p-2"
      style={{ padding: noPadding && 0 }}
    >
      {text}
    </div>
  );
};

const Example = () => {
  return (
    <div className="bg-deepblue-50">
      <HStack gap="3" wrap={false}>
        <Placeholder />
        <Spacer />
        <Placeholder />
      </HStack>
    </div>
  );
};

export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Spacer lar deg lett legge inn automatisk stretch mellom elementer. Dette kan komme inn nyttig når man f.eks skal plassere knapper i 'InternalHeader'.",
};
