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
  "Bil",
  "Buss",
  "Tog",
  "Skateboard",
  "Sykkel",
  "Motorsykkel",
  "Båt",
  "Fly",
  "Helikopter",
  "Lastebil",
  "Van",
  "Scooter",
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
  index: 4,
  desc: "Med `isMultiSelect` kan brukeren velge flere alternativer fra nedtrekkslisten.",
};
