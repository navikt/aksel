import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
      onRangeChange: console.log,
    });

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps}>
        <div className="flex flex-wrap justify-center gap-4">
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
      {selectedRange && (
        <div className="pt-4">
          <div>
            {selectedRange?.from &&
              format(selectedRange.from, "dd.MM.yyyy", { locale: nb })}
          </div>
          <div>
            {selectedRange?.to &&
              format(selectedRange.to, "dd.MM.yyyy", { locale: nb })}
          </div>
        </div>
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
  index: 7,
  desc: "Før du velger å bruke range, vurder om to separate datepickere i single mode er bedre. Range fungerer best for korte perioder innenfor en måned.",
};
