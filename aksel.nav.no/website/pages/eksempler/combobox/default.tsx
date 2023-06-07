import { Combobox } from "@navikt/ds-react";
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

const initialSelectedOptions = ["passion fruit", "grape fruit"];

export const Example = () => {
  return (
    <div>
      <Combobox
        options={initialOptions}
        selectedOptions={initialSelectedOptions}
      />
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
