import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const initialOptions = [
  "banana",
  "apple",
  "tangerine",
  "pear",
  "grape",
  "kiwi",
  "mango",
  "passion fruit",
  "pineapple",
  "strawberry",
  "watermelon",
  "grape fruit",
];

const initialSelectedOptions = ["passion fruit"];

export const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        label="Hva er din favorittfrukt?"
        options={initialOptions}
        selectedOptions={initialSelectedOptions}
      />
    </div>
  );
};

export default withDsExample(Example, "static");

export const args = {
  index: 0,
  desc: "Ved Single Select velger brukeren kun ett valg fra nedtrekkslisten.",
};
