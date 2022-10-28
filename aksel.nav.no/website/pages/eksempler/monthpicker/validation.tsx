import { UNSAFE_MonthPicker, UNSAFE_useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [month, setMonth] = useState<Date | undefined>();

  const { monthpickerProps, inputProps } = UNSAFE_useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onMonthChange: setMonth,
  });

  return (
    <div className="min-h-96">
      <UNSAFE_MonthPicker {...monthpickerProps}>
        <div className="grid gap-4">
          <UNSAFE_MonthPicker.Input
            {...inputProps}
            label="Velg månede"
            error={!month && "Du må velge månede"}
          />
        </div>
      </UNSAFE_MonthPicker>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
  desc: "Vi anbefaler å bruke UNSAFE_useMonthpicker-hook hvis man har et input-felt",
};
