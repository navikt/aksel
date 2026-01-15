import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  ErrorSummary,
  Heading,
  Page,
  Radio,
  RadioGroup,
  TextField,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import FormNavigationSimple from "../../../components/website-modules/examples/__parts-inline/FormNavigationSimple";

type Inputs = {
  fødselsnummer: string;
  transportmiddel: string;
};

const Example = () => {
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { isSubmitSuccessful, errors },
  } = useForm<Inputs>({
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  const onValidSubmit: SubmitHandler<Inputs> = (data) => {
    console.info("data", data);
  };

  if (isSubmitSuccessful)
    return (
      <Page.Block width="lg" gutters>
        <VStack gap="space-32" align="center">
          <Heading size="large">Demo slutt</Heading>
          <Button
            onClick={() => {
              location.hash = "";
              location.reload();
            }}
          >
            Nullstill
          </Button>
        </VStack>
      </Page.Block>
    );

  return (
    <Page.Block width="lg" gutters>
      <form
        onSubmit={(event) => {
          handleSubmit(onValidSubmit)(event).then(() => {
            errorSummaryRef.current?.focus();
          });
        }}
      >
        <VStack gap="space-32">
          <TextField
            id="fødselsnummer"
            label="Fødselsnummer"
            htmlSize={11}
            error={errors.fødselsnummer?.message}
            {...register("fødselsnummer", {
              required: "Du må fylle ut fødselsnummer.",
              pattern: {
                value: /^\d{11}$/,
                message: "Fødselsnummer må være 11 siffer.",
              }, // Det er anbefalt å bruke https://github.com/navikt/fnrvalidator for å validere fødselsnummer.
            })}
          />
          <RadioGroup
            legend="Transportmiddel"
            error={errors.transportmiddel?.message}
            onChange={() => trigger("transportmiddel")}
            name="transportmiddel"
          >
            {["Bil", "Gange", "Kollektivtransport"].map((value) => (
              <Radio
                key={value}
                id={value === "Bil" ? "transportmiddel" : undefined}
                value={value}
                {...register("transportmiddel", {
                  required: "Du må velge et transportmiddel.",
                })}
              >
                {value}
              </Radio>
            ))}
          </RadioGroup>

          {Object.values(errors).length > 0 && (
            <ErrorSummary
              ref={errorSummaryRef}
              heading="Du må rette disse feilene før du kan fortsette:"
            >
              {Object.entries(errors).map(([key, error]) => (
                <ErrorSummary.Item key={key} href={`#${key}`}>
                  {error.message}
                </ErrorSummary.Item>
              ))}
            </ErrorSummary>
          )}

          <FormNavigationSimple />
        </VStack>
      </form>
    </Page.Block>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static-full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  sandbox: false,
};
