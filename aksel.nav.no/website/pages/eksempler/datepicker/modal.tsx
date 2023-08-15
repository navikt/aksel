import { DatePicker, useDatepicker, Button, Modal } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useRef } from "react";
import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: "Heading" }}>
        <Modal.Body>
          <div className="min-h-96 min-w-96 max-w-full">
            <DatePicker {...datepickerProps} strategy="fixed">
              <DatePicker.Input {...inputProps} label="Velg dato" />
            </DatePicker>
            <div className="pt-4">
              {selectedDay &&
                format(selectedDay, "dd.MM.yyyy", { locale: nbLocale })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 11,
};
