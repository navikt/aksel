import { useState } from "react";
import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [error, setError] = useState(
    "Du må velge en aldersgruppe før du kan gå videre.",
  );
  const handleChange = (val: string) => {
    console.info(val);
    setError("");
  };

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={handleChange}
      error={error}
    >
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
