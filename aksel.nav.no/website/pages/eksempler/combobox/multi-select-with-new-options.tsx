import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        allowNewValues
        label="Hva er dine favorittdrikker? Legg gjerne til flere alternativer."
        options={initialOptions}
        isMultiSelect
      />
    </div>
  );
};

const initialOptions = [
  "tea",
  "coffee",
  "hot chocolate",
  "lemonade",
  "orange juice",
  "apple juice",
  "smoothie",
  "milk",
  "water",
  "soda",
  "beer",
  "wine",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Ved Multi Select kan brukeren velge flere valg fra nedtrekkslisten.",
};
