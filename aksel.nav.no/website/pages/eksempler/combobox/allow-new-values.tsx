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
  "Te",
  "Kaffe",
  "Varm sjokolade",
  "Lemonade",
  "Appelsinjuice",
  "Eplejuice",
  "Smoothie",
  "Melk",
  "Vann",
  "Brus",
  "Øl",
  "Vin",
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
  desc: "Med `allowNewValues` kan brukeren legge til egne alternativer som ikke finnes i listen.",
};
