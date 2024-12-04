import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const selectedOptions = ["napoleonskake", "donut"];

  return (
    <UNSAFE_Combobox
      options={options}
      label="Hva er dine favorittfrukter?"
      description="Bare de fruktene som du spiser minst 5 av om dagen teller vi som en favorittfrukt."
      selectedOptions={selectedOptions}
      isMultiSelect
      readOnly
    />
  );
};

const options = [
  "ananas",
  "banan",
  "bringebær",
  "drue",
  "eple",
  "grapefrukt",
  "jordbær",
  "kiwi",
  "mandarin",
  "mango",
  "pære",
  "pasjonsfrukt",
  "vannmelon",
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
