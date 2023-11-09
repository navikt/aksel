import { withDsExample } from "@/web/examples/withDsExample";
import { UNSAFE_Combobox } from "@navikt/ds-react";

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

export const Example = () => {
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

export default withDsExample(Example, { variant: "static" });

export const args = {
  index: 1,
  desc: "Ved Multi Select kan brukeren velge flere valg fra nedtrekkslisten.",
};
