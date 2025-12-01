import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.info(val);

  return (
    <CheckboxGroup
      legend="Transportmiddel"
      onChange={handleChange}
      value={["taxi"]}
      disabled
    >
      <Checkbox value="car">Bil</Checkbox>
      <Checkbox value="taxi">Drosje</Checkbox>
      <Checkbox value="public">Kollektivt</Checkbox>
    </CheckboxGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Vi fraråder bruk av disabled state. Vurder om du trenger å vise feltet i det hele tatt, om du heller kan bruke `readOnly`, eller bare kan skrive det ut i ren tekst.",
};
