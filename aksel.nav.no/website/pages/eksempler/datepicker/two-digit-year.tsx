import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";
import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

const year = new Date().getFullYear();

export const args = {
  index: 10,
  desc: `Prop 'allowTwoDigitYear' legger til støtte for 'yy'-format. 
         Tilgjengelig year-range vil være 80 år bakover og 19 år framover. 
         I ${year} tilsvarer det ${year - 80}-${year + 19}.`,
};
