import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type Inputs = { transportmiddel: string[] };

const Example = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onBlur",
    defaultValues: { transportmiddel: [] },
  });

  const onValidSubmit: SubmitHandler<Inputs> = (data) => {
    alert(data);
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <Controller
        control={control}
        rules={{ required: "Du må velge minst ett transportmiddel." }}
        name="transportmiddel"
        render={({ field }) => (
          <UNSAFE_Combobox
            id="transportmiddel"
            label="Hva er de kuleste transportmidlene?"
            options={options}
            isMultiSelect
            error={errors.transportmiddel?.message}
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            onToggleSelected={(option, isSelected) => {
              if (isSelected) {
                field.onChange([...field.value, option]);
              } else {
                field.onChange(field.value.filter((v) => v !== option));
              }
            }}
          />
        )}
      />
    </form>
  );
};

const options = [
  "car",
  "bus",
  "train",
  "skateboard",
  "bicycle",
  "motorcycle",
  "boat",
  "airplane",
  "helicopter",
  "truck",
  "van",
  "scooter",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Eksempel på bruk med react-hook-form.",
  sandbox: false,
};
