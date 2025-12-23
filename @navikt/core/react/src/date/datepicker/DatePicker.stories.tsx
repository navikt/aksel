import { Meta, StoryObj } from "@storybook/react-vite";
import { isSameDay } from "date-fns";
import React, { useState } from "react";
import { Button } from "../../button";
import { HGrid } from "../../layout/grid";
import Modal from "../../modal/Modal";
import { BodyLong } from "../../typography";
import { useId } from "../../util";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import DatePicker, { DatePickerProps } from "./DatePicker";
import { useDatepicker } from "./hooks/useDatepicker";
import { useRangeDatepicker } from "./hooks/useRangeDatepicker";

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
          {!props.standalone &&
            (props.inputfield && props.mode !== "multiple" ? (
              props.mode === "range" ? (
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
                <DatePicker.Input
                  label="Velg dato"
                  size={props?.size}
                  {...singleCtx.inputProps}
                />
              )
            ) : (
              <Button onClick={() => setOpen((x) => !x)}>
                Åpne datovelger
              </Button>
            ))}
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

export const UseDatepicker = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2029"),
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
  <DatePicker.Standalone
    today={new Date("2006-07-01")}
    onSelect={console.info}
    defaultSelected={new Date("2006-07-05")}
  />
);

export const StandaloneRange = () => (
  <DatePicker.Standalone
    mode="range"
    today={new Date("2006-07-01")}
    defaultSelected={{
      from: new Date("2006-07-03"),
      to: new Date("2006-07-07"),
    }}
  />
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
              ? "Nav-kontoret er ikke åpent i helger. Velg en annen dag."
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
          <DatePicker.Input {...toInputProps} label="Til" error="123" />
        </div>
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

export const WeekNumber = () => {
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
    <HGrid
      columns={{ xs: 1, md: 2 }}
      gap="space-80 space-16"
      style={{ marginBlockEnd: "30rem" }}
    >
      <DatePicker.Standalone showWeekNumber today={new Date("2006-07-01")} />
      <DatePicker.Standalone
        showWeekNumber
        mode="multiple"
        onWeekNumberClick={(_, dates) => handleWeekClick(dates)}
        onSelect={(dates) => dates && setDays(dates)}
        selected={days}
        today={new Date("Nov 23 2022")}
        toDate={new Date("Nov 19 2023")}
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
      <DatePicker
        dropdownCaption
        showWeekNumber
        today={new Date("2006-07-01")}
        open
      >
        <DatePicker.Input label="Velg dato" />
      </DatePicker>
      <DatePicker
        dropdownCaption
        showWeekNumber
        today={new Date("2006-07-01")}
        open
        mode="multiple"
        onWeekNumberClick={(_, dates) => handleWeekClick(dates)}
        selected={days}
      >
        <DatePicker.Input label="Velg dato" />
      </DatePicker>
    </HGrid>
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

export const ColorRole = () => (
  <div data-color="meta-purple">
    <DatePicker.Standalone
      today={new Date("2006-07-01")}
      defaultSelected={new Date("2006-07-08")}
      onSelect={console.info}
    />
  </div>
);

export const ChromaticSmallMobile: Story = {
  render: () => {
    const { datepickerProps, inputProps } = useDatepicker({
      fromDate: new Date("Jan 10 2020"),
      toDate: new Date("Jan 11 2020"),
    });

    return (
      <DatePicker {...datepickerProps} dropdownCaption open>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    );
  },
  parameters: {
    chromatic: {
      disable: false,
      modes: {
        sm: {
          viewport: {
            width: 320,
          },
        },
      },
    },
  },
};

export const Chromatic = renderStoriesForChromatic({
  DropdownCaption,
  DisabledDays,
  UseDatepicker,
  UseRangedDatepicker,
  NB,
  NN,
  EN,
  Standalone,
  StandaloneRange,
  ColorRole,
  UserControlled,
  DisabledInput,
  ErrorInput,
  Size,
  Readonly,
  StandaloneOptions,
  WeekNumber,
});
