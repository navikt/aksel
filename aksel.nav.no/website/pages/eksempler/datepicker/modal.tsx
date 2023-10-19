import { DatePicker, Modal } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import format from "date-fns/format";
import nbLocale from "date-fns/locale/nb";
import { useState } from "react";

const Example = () => {
  const [date, setDate] = useState(null);

  return (
    <Modal open header={{ heading: "Heading" }}>
      <Modal.Body>
        <div className="min-h-96 min-w-96 max-w-full">
          <DatePicker.Standalone
            onSelect={setDate}
            fromDate={new Date("Aug 23 2019")}
            fixedWeeks
          />
          <div className="pt-4">
            {date && format(date, "dd.MM.yyyy", { locale: nbLocale })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
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
