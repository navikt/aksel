"use client";

import { useState, useTransition } from "react";
import { Button, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { getCookieConsent } from "@/app/_ui/consent-banner/ConsentBanner.utils";
import { submitForm } from "./actions";

function ConsentForm({
  consent,
}: {
  consent: Awaited<ReturnType<typeof getCookieConsent>>;
}) {
  const [isPending, startTransition] = useTransition();

  const defaultConsentState = defaultRadioValue(consent);
  const [disableSave, setDisableSave] = useState(true);

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      setDisableSave(true);
      await submitForm(formData);
    });
  };

  return (
    <form action={submitAction}>
      <VStack gap="space-16" align="start">
        <RadioGroup
          legend="Velg hvilke informasjonskapsler du vil lagre på aksel.nav.no"
          name="acceptedTracking"
          defaultValue={defaultConsentState}
          onChange={() => setDisableSave(false)}
        >
          <Radio value="tracking_no">Bare nødvendige</Radio>
          <Radio value="tracking_yes">Godkjenn alle</Radio>
        </RadioGroup>
        <Button type="submit" disabled={isPending || disableSave}>
          Lagre
        </Button>
      </VStack>
    </form>
  );
}

function defaultRadioValue(
  consent: Awaited<ReturnType<typeof getCookieConsent>>,
) {
  switch (consent) {
    case "accepted":
      return "tracking_yes";
    case "rejected":
      return "tracking_no";
    default:
      return undefined;
  }
}

export { ConsentForm };
