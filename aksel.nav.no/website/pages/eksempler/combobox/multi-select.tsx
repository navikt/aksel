import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_Combobox
      label="Hva er de kuleste transportmidlene?"
      options={options}
      isMultiSelect
    />
  );
};

const options = [
  "bil",
  "buss",
  "tog",
  "skateboard",
  "sykkel",
  "motorsykkel",
  "båt",
  "fly",
  "helikopter",
  "lastebil",
  "van",
  "scooter",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Med `isMultiSelect` kan brukeren velge flere alternativer fra nedtrekkslisten.",
};
