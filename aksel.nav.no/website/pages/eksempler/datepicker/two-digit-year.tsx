import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
    allowTwoDigitYear: true,
  });

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
      <div className="pt-4">
        {selectedDay && format(selectedDay, "dd.MM.yyyy", { locale: nbLocale })}
      </div>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "Prop allowTwoDigitYear legger til støtte for 'yy'-format. Tilgjengelig year-range vil være fra 1943-2042 (2023).",
};
