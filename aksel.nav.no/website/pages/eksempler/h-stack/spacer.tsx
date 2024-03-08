import { HStack, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

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

const Placeholder = ({ text }: { text?: string }) => {
  return (
    <div className="aspect-square h-auto min-h-8 w-auto rounded bg-teal-600 p-2 text-text-on-action">
      {text}
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
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
