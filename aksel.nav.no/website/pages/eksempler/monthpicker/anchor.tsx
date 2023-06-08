import { Button, MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [month, setMonth] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-96">
      <MonthPicker
        onMonthSelect={setMonth}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button onClick={() => setOpen((x) => !x)}>Velg månede</Button>
      </MonthPicker>
      {month && <div className="pt-4">{month.getMonth()}</div>}
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
