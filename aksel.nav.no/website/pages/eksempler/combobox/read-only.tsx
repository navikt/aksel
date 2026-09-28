import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const selectedOptions = ["Drue", "Pære"];

  return (
    <UNSAFE_Combobox
      label="Hva er dine favorittfrukter?"
      description="Bare de fruktene som du spiser minst 5 av om dagen teller vi som en favorittfrukt."
      options={["Drue", "Eple", "Pære"]}
      selectedOptions={selectedOptions}
      isMultiSelect
      readOnly
    />
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 11,
};
