import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";

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
              format(selectedRange.from, "dd.MM.yyyy", { locale: nbLocale })}
          </div>
          <div>
            {selectedRange?.to &&
              format(selectedRange.to, "dd.MM.yyyy", { locale: nbLocale })}
          </div>
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
  index: 7,
  desc: "Før du belger å bruke range, vurder om to enkelte datepickere for start/slutt-dato ville vært bedre. Range fungerer bedre for korte perioder innenfor en månede.",
};
