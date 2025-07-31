import { useState } from "react";
import { Button, DatePicker, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [open, setOpen] = useState(false);

  return (
    <VStack gap="4" minHeight="24rem">
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
        <div>
          {days.map((day) => (
            <div key={day.toString()}>{day.toLocaleDateString()}</div>
          ))}
        </div>
      )}
    </VStack>
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
