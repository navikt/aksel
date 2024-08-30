import React, { useEffect } from "react";
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

const validatePersonnummer = (p: string) => {
  // Det er anbefalt å bruke https://github.com/navikt/fnrvalidator for å validere personnummer.
  if (p.length === 0) {
    return "Du må fylle ut personnummer.";
  }
  if (!/^\d{11}$/.test(p)) {
    return "Personnummer må være 11 siffer.";
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
    personnummer: "",
    transportmiddel: "",
  });
  const [errors, setErrors] = React.useState({
    personnummer: "",
    transportmiddel: "",
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors = {
      personnummer: validatePersonnummer(values.personnummer),
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
    errorSummaryRef.current?.focus();
  }, [formState]);

  if (formState.submitted)
    return (
      <Page>
        <Page.Block as="main" width="lg" gutters>
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
      </Page>
    );

  return (
    <Page>
      <Page.Block as="main" width="lg" gutters>
        <form onSubmit={onSubmit}>
          <VStack gap="8">
            <TextField
              id="personnummer"
              label="Personnummer"
              value={values.personnummer}
              onChange={(e) =>
                setValues({ ...values, personnummer: e.currentTarget.value })
              }
              onBlur={() => {
                formState.tries &&
                  setErrors({
                    ...errors,
                    personnummer: validatePersonnummer(values.personnummer),
                  });
              }}
              error={errors.personnummer}
            />
            <RadioGroup
              id="transportmiddel"
              tabIndex={-1}
              legend="Transportmiddel"
              value={values.transportmiddel}
              onChange={(newValue) => {
                setValues({ ...values, transportmiddel: newValue });
                setErrors({ ...errors, transportmiddel: "" });
              }}
              error={errors.transportmiddel}
            >
              <Radio value="car">Bil</Radio>
              <Radio value="walking">Gange</Radio>
              <Radio value="public">Kollektivtransport</Radio>
            </RadioGroup>

            {formState.tries > 0 && Object.values(errors).some(Boolean) && (
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
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
