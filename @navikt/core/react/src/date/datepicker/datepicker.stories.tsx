import { Meta, StoryObj } from "@storybook/react";
import { isSameDay } from "date-fns";
import React, { useId, useState } from "react";
import { Button } from "../../button";
import { HGrid } from "../../layout/grid";
import { VStack } from "../../layout/stack";
import Modal from "../../modal/Modal";
import { BodyLong } from "../../typography";
import { useDatepicker, useRangeDatepicker } from "../hooks";
import DatePicker, { DatePickerProps } from "./DatePicker";

const disabledDays = [
  new Date("Oct 10 2022"),
  { from: new Date("Aug 31 2022"), to: new Date("Sep 8 2022") },
];

export default {
  title: "ds-react/Datepicker",
  component: DatePicker,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

type DefaultStoryProps = DatePickerProps & {
  size: "medium" | "small";
  inputfield: boolean;
  standalone: boolean;
};

export const Default: StoryObj<DefaultStoryProps> = {
  render: (props) => {
    const [open, setOpen] = useState(false);

    const rangeCtx = useRangeDatepicker({
      fromDate: new Date("Aug 23 2023"),
      toDate: new Date("Aug 23 2029"),
    });

    const singleCtx = useDatepicker({
      fromDate: new Date("Aug 23 2020"),
      toDate: new Date("Aug 23 2029"),
    });

    const newProps = {
      ...(!props.inputfield || props.mode === "multiple"
        ? {
            open,
            onClose: () => setOpen(false),
            fromDate: new Date("Aug 23 2020"),
            toDate: new Date("Aug 23 2029"),
          }
        : {}),
    };

    const Comp = !props.standalone ? DatePicker : DatePicker.Standalone;

    return (
      <div>
        <Comp
          dropdownCaption={props.dropdownCaption}
          showWeekNumber={props.showWeekNumber}
          mode={props.mode}
          {...(props.mode === "single"
            ? singleCtx.datepickerProps
            : props.mode === "range"
              ? rangeCtx.datepickerProps
              : {})}
          {...newProps}
          locale={props.locale}
          disableWeekends={props.disableWeekends}
        >
          {!props.standalone && (
            <>
              {props.inputfield && props.mode !== "multiple" ? (
                <>
                  {props.mode === "range" ? (
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <DatePicker.Input
                        label="Fra"
                        size={props?.size}
                        {...rangeCtx.fromInputProps}
                      />
                      <DatePicker.Input
                        label="Til"
                        size={props?.size}
                        {...rangeCtx.toInputProps}
                      />
                    </div>
                  ) : (
                    <>
                      <DatePicker.Input
                        label="Velg dato"
                        size={props?.size}
                        {...singleCtx.inputProps}
                      />
                    </>
                  )}
                </>
              ) : (
                <Button onClick={() => setOpen((x) => !x)}>
                  Åpne datovelger
                </Button>
              )}
            </>
          )}
        </Comp>
      </div>
    );
  },

  args: {
    dropdownCaption: false,
    disableWeekends: false,
    showWeekNumber: false,
    mode: "single",
    inputfield: true,
    standalone: false,
  },
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
    locale: {
      options: ["nb", "nn", "en"],
      control: { type: "radio" },
    },
    mode: {
      options: ["single", "multiple", "range"],
      control: { type: "radio" },
    },
  },
};

export const DropdownCaption = () => (
  <DatePicker.Standalone
    dropdownCaption
    fromDate={new Date("Aug 23 2018")}
    toDate={new Date("Aug 23 2022")}
  />
);

export const DisabledDays = () => (
  <DatePicker.Standalone
    disabled={disabledDays}
    disableWeekends
    today={new Date("2006-07-01")}
  />
);

export const ShowWeekNumber = () => (
  <DatePicker.Standalone showWeekNumber today={new Date("2006-07-01")} />
);

export const UseDatepicker = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
    onValidate: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps} dropdownCaption>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { datepickerProps, fromInputProps, toInputProps } = useRangeDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onRangeChange: console.log,
    onValidate: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const NB = () => (
  <DatePicker.Standalone locale="nb" today={new Date("2006-07-01")} />
);

export const NN = () => (
  <DatePicker.Standalone locale="nn" today={new Date("2006-07-01")} />
);

export const EN = () => (
  <DatePicker.Standalone locale="en" today={new Date("2006-07-01")} />
);

export const Standalone = () => (
  <DatePicker.Standalone today={new Date("2006-07-01")} />
);

export const StandaloneRange = () => (
  <DatePicker.Standalone mode="range" today={new Date("2006-07-01")} />
);

export const StandaloneMultiple = () => (
  <DatePicker.Standalone mode="multiple" today={new Date("2006-07-01")} />
);

export const UserControlled = () => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <DatePicker
        mode="multiple"
        open={open}
        onClose={() => setOpen(false)}
        id={id}
      >
        <Button aria-controls={id} onClick={() => setOpen((x) => !x)}>
          Legg til dager
        </Button>
      </DatePicker>
    </div>
  );
};

export const Validering = () => {
  const [error, setError] = useState(false);
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 2 2019"),
    onValidate: (val) => setError(val.isWeekend),
    defaultSelected: new Date("Nov 26 2022"),
    disableWeekends: true,
    onDateChange: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          error={
            error
              ? "NAV-kontoret er ikke åpent i helger. Velg en annen dag."
              : undefined
          }
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};

export const DisabledInput = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker>
        <DatePicker.Input disabled label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const ErrorInput = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker>
        <DatePicker.Input error="feilmelding" label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepickerValidation = () => {
  const { datepickerProps, fromInputProps, toInputProps } = useRangeDatepicker({
    fromDate: new Date("Aug 23 2019"),
    disableWeekends: true,
    disabled: [new Date("Oct 10 2022")],
    onValidate: console.table,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const DefaultShownMonth = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
    defaultMonth: new Date("Oct 23 2022"),
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const Size = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
    defaultSelected: new Date("Feb 23 2023"),
  });
  const { datepickerProps: d2, inputProps: i2 } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
    defaultSelected: new Date("Feb 23 2023"),
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps} dropdownCaption>
        <DatePicker.Input
          placeholder="10/10/2023"
          size="medium"
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
      <DatePicker {...d2} dropdownCaption>
        <DatePicker.Input
          placeholder="10/10/2023"
          size="small"
          {...i2}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};

export const Readonly = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps} dropdownCaption>
        <DatePicker.Input
          size="medium"
          {...inputProps}
          value="01.02.2021"
          label="Velg dato"
          readOnly
        />
      </DatePicker>
    </div>
  );
};

export const StandaloneOptions = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="8">
      <DatePicker.Standalone today={new Date("Nov 23 2022")} />
      <DatePicker.Standalone
        dropdownCaption
        fromDate={new Date("Aug 23 2019")}
        toDate={new Date("Feb 23 2024")}
        today={new Date("Nov 23 2022")}
      />
      <DatePicker.Standalone showWeekNumber today={new Date("Nov 23 2022")} />
      <DatePicker.Standalone
        showWeekNumber
        mode="multiple"
        onWeekNumberClick={console.log}
        today={new Date("Nov 23 2022")}
        disableWeekends
      />
      <DatePicker.Standalone
        mode="range"
        today={new Date("Nov 23 2022")}
        disableWeekends
      />
    </HGrid>
  );
};

export const WeekDayClick = () => {
  const [days, setDays] = useState<Date[]>([]);

  const handleWeekClick = (dates: Date[]) => {
    const hasDayInWeek = !!days.find((x) => dates.find((y) => isSameDay(x, y)));

    const cleanup = days.filter((y) => !dates.find((z) => isSameDay(y, z)));
    if (hasDayInWeek) {
      setDays(cleanup);
    } else {
      setDays([...dates, ...cleanup]);
    }
  };

  return (
    <VStack gap="8">
      <DatePicker.Standalone
        showWeekNumber
        mode="multiple"
        onWeekNumberClick={(_, dates) => handleWeekClick(dates)}
        onSelect={(dates) => dates && setDays(dates)}
        selected={days}
        today={new Date("Nov 23 2022")}
      />
      <DatePicker.Standalone
        showWeekNumber
        mode="multiple"
        onWeekNumberClick={(_, dates) => handleWeekClick(dates)}
        onSelect={(dates) => dates && setDays(dates)}
        selected={days}
        today={new Date("Nov 23 2022")}
        disableWeekends
      />
    </VStack>
  );
};

export const ModalDemo = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
  });
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Modal-demo" }}
      >
        <Modal.Body style={{ position: "relative" }}>
          <BodyLong spacing>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </BodyLong>

          <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input
              {...inputProps}
              label="Velg dato"
              description="Format: dd.mm.yyyy"
            />
          </DatePicker>
        </Modal.Body>
        <Modal.Footer>
          <Button>Neste</Button>
          <Button variant="secondary">Tilbake</Button>
          <Button variant="tertiary">Avbryt</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
ModalDemo.parameters = { chromatic: { pauseAnimationAtEnd: true } };

export const Chromatic: Story = {
  render: () => (
    <div>
      <div>
        <h2>DropdownCaption</h2>
        <DropdownCaption />
      </div>
      <div>
        <h2>DisabledDays</h2>
        <DisabledDays />
      </div>
      <div>
        <h2>ShowWeekNumber</h2>
        <ShowWeekNumber />
      </div>
      <div>
        <h2>UseDatepicker</h2>
        <UseDatepicker />
      </div>
      <div>
        <h2>UseRangedDatepicker</h2>
        <UseRangedDatepicker />
      </div>
      <div>
        <h2>NB</h2>
        <NB />
      </div>
      <div>
        <h2>NN</h2>
        <NN />
      </div>
      <div>
        <h2>EN</h2>
        <EN />
      </div>
      <div>
        <h2>Standalone</h2>
        <Standalone />
      </div>
      <div>
        <h2>StandaloneRange</h2>
        <StandaloneRange />
      </div>
      <div>
        <h2>StandaloneMultiple</h2>
        <StandaloneMultiple />
      </div>
      <div>
        <h2>UserControlled</h2>
        <UserControlled />
      </div>
      <div>
        <h2>Validering</h2>
        <Validering />
      </div>
      <div>
        <h2>DisabledInput</h2>
        <DisabledInput />
      </div>
      <div>
        <h2>ErrorInput</h2>
        <ErrorInput />
      </div>
      <div>
        <h2>UseRangedDatepickerValidation</h2>
        <UseRangedDatepickerValidation />
      </div>
      <div>
        <h2>DefaultShownMonth</h2>
        <DefaultShownMonth />
      </div>
      <div>
        <h2>Size</h2>
        <Size />
      </div>
      <div>
        <h2>Readonly</h2>
        <Readonly />
      </div>
      <div>
        <h2>StandaloneOptions</h2>
        <StandaloneOptions />
      </div>
      <div>
        <h2>WeekDayClick</h2>
        <WeekDayClick />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
