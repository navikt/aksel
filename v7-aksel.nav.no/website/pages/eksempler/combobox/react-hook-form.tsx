import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type Inputs = { transportmiddel: string[] };

const Example = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    shouldFocusError: true, // Sett denne til false hvis du bruker ErrorSummary
    defaultValues: { transportmiddel: [] },
  });

  const onValidSubmit: SubmitHandler<Inputs> = (data) => {
    alert("Du valgte: " + data.transportmiddel.join(", "));
  };

  return (
    <VStack as="form" gap="space-32" onSubmit={handleSubmit(onValidSubmit)}>
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
      <div>
        <Button type="submit">Send inn</Button>
      </div>
    </VStack>
  );
};

const options = [
  "bil",
  "buss",
  "tog",
  "skateboard",
  "sykkel",
  "motorsykkel",
  "båt",
  "fly",
  "helikopter",
  "lastebil",
  "van",
  "scooter",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "300px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Eksempel på bruk med react-hook-form.",
  sandbox: false,
};
