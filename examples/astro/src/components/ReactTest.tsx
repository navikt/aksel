import { Button, DatePicker } from "@navikt/ds-react";

export const ReactTest = () => {
  return (
    <div>
      ReactTest123 <Button onClick={console.log}>Button</Button>
      <DatePicker.Standalone
        dropdownCaption
        fromDate={new Date("1 Oct 2020")}
        toDate={new Date("1 Oct 2024")}
      />
    </div>
  );
};
