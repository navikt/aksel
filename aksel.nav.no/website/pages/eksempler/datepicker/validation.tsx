import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [day, setDay] = useState<Date | undefined>();
  const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: setDay,
  });

  return (
    <div className="min-h-96">
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input
          {...inputProps}
          label="Velg dato"
          error={!day && "Må velge en dag"}
        />
      </UNSAFE_DatePicker>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 9,
  desc: "Vi anbefaler å bruke UNSAFE_useDatepicker-hook hvis man har et input-felt",
};
