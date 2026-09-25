import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_Combobox
      label="Hva er din favorittfrukt?"
      options={options}
      error="Du må velge en favorittfrukt."
    />
  );
};

const options = [
  "Ananas",
  "Banan",
  "Bringebær",
  "Drue",
  "Eple",
  "Grapefrukt",
  "Jordbær",
  "Kiwi",
  "Mandarin",
  "Mango",
  "Pære",
  "Pasjonsfrukt",
  "Vannmelon",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "260px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 3,
};
