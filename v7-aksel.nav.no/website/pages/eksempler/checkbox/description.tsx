import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.info(val);

  return (
    <CheckboxGroup
      legend="Transportmiddel"
      description="Oppgi alle transportmidlene du brukte for å komme til reisemålet."
      onChange={handleChange}
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
  index: 2,
  desc: "Bruk `description` i tillegg til `legend` når det er behov for mer utfyllende forklaring.",
};
