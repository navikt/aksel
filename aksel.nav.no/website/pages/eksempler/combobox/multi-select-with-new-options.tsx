import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

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

const initialSelectedOptions = ["lemonade", "coffee", "beer"];

export const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        label="Hva er dine favorittdrikker? Legg gjerne til flere alternativer."
        options={initialOptions}
        selectedOptions={initialSelectedOptions}
        isMultiSelect
      />
    </div>
  );
};

export default withDsExample(Example, "static");

export const args = {
  index: 1,
  desc: "Ved Multi Select kan brukeren velge flere valg fra nedtrekkslisten.",
};
