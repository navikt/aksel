import { withDsExample } from "@/web/examples/withDsExample";
import { Radio, RadioGroup } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [val, setVal] = useState("20");

  return (
    <RadioGroup legend="Velg din aldersgruppe." onChange={setVal} value={val}>
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
};
