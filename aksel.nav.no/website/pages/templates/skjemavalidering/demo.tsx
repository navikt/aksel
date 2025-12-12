import React, { useEffect } from "react";
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

const validateFødselsnummer = (p: string) => {
  // Det er anbefalt å bruke https://github.com/navikt/fnrvalidator for å validere fødselsnummer.
  if (p.length === 0) {
    return "Du må fylle ut fødselsnummer.";
  }
  if (!/^\d{11}$/.test(p)) {
    return "Fødselsnummer må være 11 siffer.";
  }
  return "";
};

const Example = () => {
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);

  const [formState, setFormState] = React.useState({
    submitted: false,
    tries: 0,
  });
  const [values, setValues] = React.useState({
    fødselsnummer: "",
    transportmiddel: "",
  });
  const [errors, setErrors] = React.useState({
    fødselsnummer: "",
    transportmiddel: "",
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors = {
      fødselsnummer: validateFødselsnummer(values.fødselsnummer),
      transportmiddel: values.transportmiddel
        ? ""
        : "Du må velge et transportmiddel.",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setFormState({ ...formState, tries: formState.tries + 1 });
    } else {
      setFormState({ ...formState, submitted: true });
    }
  }

  useEffect(() => {
    formState.tries > 0 && errorSummaryRef.current?.focus();
  }, [formState.tries]);

  if (formState.submitted)
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
      <form onSubmit={onSubmit}>
        <VStack gap="space-32">
          <TextField
            id="fødselsnummer"
            label="Fødselsnummer"
            htmlSize={11}
            value={values.fødselsnummer}
            onChange={(e) =>
              setValues({ ...values, fødselsnummer: e.currentTarget.value })
            }
            onBlur={() => {
              formState.tries &&
                setErrors({
                  ...errors,
                  fødselsnummer: validateFødselsnummer(values.fødselsnummer),
                });
            }}
            error={errors.fødselsnummer}
          />
          <RadioGroup
            legend="Transportmiddel"
            value={values.transportmiddel}
            onChange={(newValue) => {
              setValues({ ...values, transportmiddel: newValue });
              setErrors({ ...errors, transportmiddel: "" });
            }}
            error={errors.transportmiddel}
          >
            <Radio value="car" id="transportmiddel">
              Bil
            </Radio>
            <Radio value="walking">Gange</Radio>
            <Radio value="public">Kollektivtransport</Radio>
          </RadioGroup>

          {Object.values(errors).some(Boolean) && (
            <ErrorSummary
              ref={errorSummaryRef}
              heading="Du må rette disse feilene før du kan fortsette:"
            >
              {Object.entries(errors)
                .filter(([, error]) => error)
                .map(([key, error]) => (
                  <ErrorSummary.Item href={`#${key}`} key={key}>
                    {error}
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
  index: 1,
};
