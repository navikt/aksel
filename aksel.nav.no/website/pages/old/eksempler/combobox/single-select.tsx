import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_Combobox label="Hva er din favorittfrukt?" options={options} />
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
  index: 0,
  desc: "Ved Single Select velger brukeren kun ett valg fra nedtrekkslisten.",
};
