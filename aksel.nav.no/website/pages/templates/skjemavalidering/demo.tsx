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

  const [hasTriedToSubmit, setHasTriedToSubmit] = React.useState(0);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const [personnummer, setPersonnummer] = React.useState("");
  const [personnummerError, setPersonnummerError] = React.useState("");
  const [transportmiddel, setTransportmiddel] = React.useState("");
  const [transportmiddelError, setTransportmiddelError] = React.useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setHasTriedToSubmit(hasTriedToSubmit + 1);
    let isValidForm = true;

    const personnummerErrorMsg = validatePersonnummer(personnummer);
    setPersonnummerError(personnummerErrorMsg);
    if (personnummerErrorMsg) {
      isValidForm = false;
    }
    const transportmiddelInvalid = !transportmiddel;
    setTransportmiddelError(transportmiddelInvalid);
    if (transportmiddelInvalid) {
      isValidForm = false;
    }

    if (isValidForm) {
      setFormSubmitted(true);
    }
  }

  useEffect(() => {
    errorSummaryRef.current?.focus();
  }, [hasTriedToSubmit]);

  const showErrorSummary = Boolean(
    hasTriedToSubmit && (personnummerError || transportmiddelError),
  );

  if (formSubmitted)
    return (
      <Page style={{ marginTop: 20 }}>
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
    <Page style={{ marginTop: 20 }}>
      <Page.Block as="main" width="lg" gutters>
        <form onSubmit={onSubmit}>
          <VStack gap="8">
            <TextField
              id="personnummer"
              label="Personnummer"
              value={personnummer}
              onChange={(e) => setPersonnummer(e.currentTarget.value)}
              onBlur={() => {
                Boolean(hasTriedToSubmit) &&
                  setPersonnummerError(validatePersonnummer(personnummer));
              }}
              error={personnummerError}
            />
            <RadioGroup
              id="transportmiddel"
              tabIndex={-1}
              legend="Transportmiddel"
              value={transportmiddel}
              onChange={(newValue) => {
                setTransportmiddel(newValue);
                setTransportmiddelError(false);
              }}
              error={transportmiddelError && "Du må velge et transportmiddel."}
            >
              <Radio value="car">Bil</Radio>
              <Radio value="walking">Gange</Radio>
              <Radio value="public">Kollektivtransport</Radio>
            </RadioGroup>

            {showErrorSummary && (
              <ErrorSummary
                ref={errorSummaryRef}
                heading="Du må fikse disse feilene før du kan fortsette:"
              >
                {personnummerError ? (
                  <ErrorSummary.Item href="#personnummer">
                    {personnummerError}
                  </ErrorSummary.Item>
                ) : null}
                {transportmiddelError && (
                  <ErrorSummary.Item href="#transportmiddel">
                    Du må velge et transportmiddel.
                  </ErrorSummary.Item>
                )}
              </ErrorSummary>
            )}

            <HGrid
              gap={{ xs: "4", sm: "8 4" }}
              columns={{ xs: 1, sm: 2 }}
              width={{ sm: "fit-content" }}
              style={{ marginBottom: 200 }}
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
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 1,
};
