import React, { useEffect } from "react";
import { ArrowLeftIcon, PaperplaneIcon } from "@navikt/aksel-icons";
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
    return "Personnummer må være 11 sifre.";
  }
  return "";
};

// array of functions to run
let formSubmissionQueue = [];

const addToFormSubmissionQueue = (eventFN) => {
  formSubmissionQueue.push(eventFN);
};

const processFormSubmissionQueue = () => {
  formSubmissionQueue.forEach((e) => e());
  formSubmissionQueue = [];
};

const Example = () => {
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);

  const [hasTriedToSubmit, setHasTriedToSubmit] = React.useState(0);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const [personnummer, setPersonnummer] = React.useState("");
  const [transportmiddel, setTransportmiddel] = React.useState("");

  const [personnummerError, setPersonnummerError] = React.useState("");
  const [transportmiddelError, setTransportmiddelError] = React.useState(false);

  function submit(event: React.FormEvent) {
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

  const showErrorSummary = Boolean(
    hasTriedToSubmit && (personnummerError || transportmiddelError),
  );

  // this runs anything queued by onBlurs
  useEffect(() => {
    document.addEventListener("mouseup", () => {
      processFormSubmissionQueue();
    });
  }, []);

  useEffect(() => {
    if (showErrorSummary) {
      errorSummaryRef.current?.focus();
    }
  }, [showErrorSummary, hasTriedToSubmit]);

  if (formSubmitted)
    return (
      <Page>
        <Page.Block as="main" width="lg" gutters>
          <VStack gap="8" align="center">
            <Heading size="large">Søknad sendt!</Heading>
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
    <Page style={{ marginTop: 100 }}>
      <Page.Block as="main" width="lg" gutters>
        <form onSubmit={submit}>
          <VStack gap="8">
            <TextField
              id="personnummer"
              label="Personnummer"
              description="Du må skrive et gyldig personnummer eller D-nummer"
              value={personnummer}
              onChange={(e) => setPersonnummer(e.currentTarget.value)}
              onBlur={(e) => {
                addToFormSubmissionQueue(() => {
                  (Boolean(hasTriedToSubmit) || personnummer !== "") &&
                    setPersonnummerError(validatePersonnummer(personnummer));
                });
                // if (e.relatedTarget?.innerText !== "Send søknad")
                //   setPersonnummerError(validatePersonnummer(personnummer));
                console.log(e);
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
              <Radio value="walking">Spasering</Radio>
              <Radio value="public">Kollektivtransport</Radio>
            </RadioGroup>

            {showErrorSummary && (
              <ErrorSummary
                ref={errorSummaryRef}
                heading="Du må fikse disse feilene før du kan sende inn søknad."
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
                icon={<PaperplaneIcon aria-hidden />}
                iconPosition="right"
              >
                Send søknad
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
  title: "TODO",
  desc: "TODO",
};
