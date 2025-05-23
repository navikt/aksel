import { useState } from "react";
import { Box, Button, DatePicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-96">
      <DatePicker
        onSelect={(val) => setDays(val)}
        mode="multiple"
        max={5}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button onClick={() => setOpen((x) => !x)}>Velg dager</Button>
      </DatePicker>
      {days && (
        <Box paddingBlock="4 0">
          {days.map((day) => (
            <div key={day.toString()}>{day.toISOString().split("T")[0]}</div>
          ))}
        </Box>
      )}
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
