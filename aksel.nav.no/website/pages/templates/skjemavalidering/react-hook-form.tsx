import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Button,
  ErrorSummary,
  HGrid,
  Heading,
  Page,
  Radio,
  RadioGroup,
  TextField,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type Inputs = {
  personnummer: string;
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
        <VStack gap="8" align="center">
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
        <VStack gap="8">
          <TextField
            id="personnummer"
            label="Personnummer"
            htmlSize={11}
            error={errors.personnummer?.message}
            {...register("personnummer", {
              required: "Du må fylle ut personnummer.",
              pattern: {
                value: /^\d{11}$/,
                message: "Personnummer må være 11 siffer.",
              }, // Det er anbefalt å bruke https://github.com/navikt/fnrvalidator for å validere personnummer.
            })}
          />
          <RadioGroup
            id="transportmiddel"
            tabIndex={-1}
            legend="Transportmiddel"
            error={errors.transportmiddel?.message}
            onChange={() => trigger("transportmiddel")}
            name="transportmiddel"
          >
            {["Bil", "Gange", "Kollektivtransport"].map((value) => (
              <Radio
                key={value}
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

          <HGrid
            gap={{ xs: "4", sm: "8 4" }}
            columns={{ xs: 1, sm: 2 }}
            width={{ sm: "fit-content" }}
          >
            <Button
              type="button"
              variant="secondary"
              icon={<ArrowLeftIcon aria-hidden />}
              iconPosition="left"
            >
              Forrige steg
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Neste steg
            </Button>
          </HGrid>
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
};
