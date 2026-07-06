import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_Combobox
      allowNewValues
      label="Hva er dine favorittdrikker? Legg gjerne til flere alternativer."
      options={initialOptions}
      isMultiSelect
    />
  );
};

const initialOptions = [
  "te",
  "kaffe",
  "varm sjokolade",
  "lemonade",
  "appelsinjuice",
  "eplejuice",
  "smoothie",
  "melk",
  "vann",
  "brus",
  "øl",
  "vin",
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
  index: 6,
  desc: "Med `allowNewValues` kan brukeren legge til egne verdier som ikke finnes i listen.",
};
