import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [val, setVal] = useState("20");

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={(val: any) => setVal(val)}
      value={val}
    >
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

export default withDsExample(Example);

export const args = {
  index: 9,
};
