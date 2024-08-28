import { Button, DatePicker } from "@navikt/ds-react";
import { Alert } from "@navikt/ds-react/Alert";

export const ReactTest = () => {
  return (
    <div>
      ReactTest123 <Button onClick={console.info}>Button</Button>
      <Alert variant="info">abc</Alert>
      <DatePicker.Standalone
        dropdownCaption
        fromDate={new Date("1 Oct 2020")}
        toDate={new Date("1 Oct 2024")}
      />
    </div>
  );
};
