import {
  UNSAFE_DatePicker,
  UNSAFE_useDatepicker,
  Button,
  Modal,
  Heading,
} from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useEffect, useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);

  const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Åpne modal</Button>

      <Modal
        open={open}
        aria-label="Modal demo"
        onClose={() => setOpen((x) => !x)}
        shouldCloseOnEsc={!datepickerProps.open}
        aria-labelledby="modal-heading"
      >
        <Modal.Content className="min-w-96 max-w-full">
          <Heading spacing level="1" size="large" id="modal-heading">
            Heading
          </Heading>
          <div className="min-h-96">
            <UNSAFE_DatePicker {...datepickerProps} strategy="fixed">
              <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
            </UNSAFE_DatePicker>
            <div className="pt-4">
              {selectedDay && selectedDay.toDateString()}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 11,
  desc: "Ved bruk av datepicker i Modal er det viktig at 'Escape' ikke lukker selve modalen hvis datepicker er åpen. Bruk 'shouldCloseOnEsc' for å toggle dette når datepicker er åpen.",
};
