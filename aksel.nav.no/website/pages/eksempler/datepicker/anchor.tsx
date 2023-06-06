import { Button, UNSAFE_DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [days, setDays] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-96">
      <UNSAFE_DatePicker
        onSelect={setDays}
        mode="multiple"
        max={5}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button onClick={() => setOpen((x) => !x)}>Velg dager</Button>
      </UNSAFE_DatePicker>
      {days && (
        <div className="pt-4">
          {days.map((x) => (
            <div key={x.toString()}>{x.toDateString()}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
