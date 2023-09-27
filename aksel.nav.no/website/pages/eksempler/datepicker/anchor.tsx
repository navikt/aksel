import { Button, DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";
import { useState } from "react";

const Example = () => {
  const [days, setDays] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-96">
      <DatePicker
        onSelect={setDays}
        mode="multiple"
        max={5}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button onClick={() => setOpen((x) => !x)}>Velg dager</Button>
      </DatePicker>
      {days && (
        <div className="pt-4">
          {days.map((x) => (
            <div key={x.toString()}>
              {format(x, "dd.MM.yyyy", { locale: nbLocale })}
            </div>
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
