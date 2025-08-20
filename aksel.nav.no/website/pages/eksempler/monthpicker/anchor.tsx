import { useState } from "react";
import { Button, MonthPicker, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [month, setMonth] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <VStack gap="space-16" minHeight="16rem">
      <MonthPicker
        onMonthSelect={setMonth}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button onClick={() => setOpen((x) => !x)}>Velg måned</Button>
      </MonthPicker>
      {month && (
        <div>
          {month.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
          })}
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
  index: 4,
};
