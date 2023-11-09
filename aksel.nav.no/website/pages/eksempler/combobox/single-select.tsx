import { withDsExample } from "@/web/examples/withDsExample";
import { UNSAFE_Combobox } from "@navikt/ds-react";

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

export const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        label="Hva er din favorittfrukt?"
        options={initialOptions}
      />
    </div>
  );
};

export default withDsExample(Example, { variant: "static" });

export const args = {
  index: 0,
  desc: "Ved Single Select velger brukeren kun ett valg fra nedtrekkslisten.",
};
