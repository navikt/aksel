import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const selectedOptions = ["napoleonskake", "donut"];

  return (
    <div>
      <UNSAFE_Combobox
        options={initialOptions}
        label="Hva er dine favorittfrukter?"
        description="Bare de fruktene som du spiser minst 5 av om dagen teller vi som en favorittfrukt."
        selectedOptions={selectedOptions}
        isMultiSelect
        readOnly
      />
    </div>
  );
};

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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
};
