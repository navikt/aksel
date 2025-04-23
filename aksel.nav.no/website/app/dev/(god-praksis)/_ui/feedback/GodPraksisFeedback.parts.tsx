"use client";

import { usePathname } from "next/dist/client/components/navigation";
import { PersonIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Textarea,
} from "@navikt/ds-react";
import { useGodPraksisFeedbackContext } from "@/app/dev/(god-praksis)/_ui/feedback/GodPraksisFeedback.provider";

function GodPraksisFeedbackLoginState() {
  const { formState } = useGodPraksisFeedbackContext();

  const pathname = usePathname();

  if (formState !== "loggedOut") {
    return null;
  }

  return (
    <div>
      <Heading level="2" size="small" data-aksel-heading-color>
        Innspill til artikkelen
      </Heading>
      <Box asChild paddingBlock="space-4 space-24">
        <BodyLong>
          Logg inn med NAV SSO for å gi innspill til artikkelen
        </BodyLong>
      </Box>
      <Button
        as="a"
        href={`/oauth2/login?redirect=${pathname?.split(
          "#",
        )[0]}${encodeURIComponent("#scrollToFeedback")}`}
        data-color-role="brand-blue"
      >
        Logg inn med Nav SSO
      </Button>
    </div>
  );
}

function GodPraksisFeedbackSuccessState() {
  const { formState, updateFormState } = useGodPraksisFeedbackContext();

  if (formState !== "sent") {
    return null;
  }

  return (
    <div>
      <Heading level="2" size="small" data-aksel-heading-color>
        Innspill sendt
      </Heading>
      <Box asChild paddingBlock="space-4 space-24">
        <BodyLong>
          Ditt innspill er viktig for å holde kvaliteten oppe og innholdet
          relevant. Takk skal du ha!
        </BodyLong>
      </Box>
      <Button
        onClick={() => updateFormState("writable")}
        data-color-role="brand-blue"
      >
        Nytt innspill
      </Button>
    </div>
  );
}

function GodPraksisFeedbackWriteState() {
  const { formState } = useGodPraksisFeedbackContext();
  const pathname = usePathname();

  if (formState !== "writable") {
    return null;
  }

  return (
    <div>
      <Heading level="2" size="small" data-aksel-heading-color>
        Innspill til artikkelen
      </Heading>
      <Box asChild paddingBlock="space-4 space-24">
        <BodyLong>
          Har du innspill til artikkelen? Meldingen blir sendt med Slack til
          folka som har lagd artikkelen 🙌
        </BodyLong>
      </Box>
      <HStack gap="space-8" paddingBlock="0 space-24">
        <PersonIcon aria-hidden fontSize="1.5rem" />
        <BodyShort>Ola Normann</BodyShort>

        <Link variant="subtle" href={`/oauth2/logout?redirect=${pathname}`}>
          (logg ut)
        </Link>
      </HStack>

      <form onSubmit={() => null}>
        <Textarea
          name="feedback"
          label="Innspill"
          minRows={4}
          maxLength={500}
          /* error={formError} */
          /* onInput={(element) => {
            if (element.currentTarget.value.length > 500) {
              return;
              }
              setFormError(null);
              }} */
        />
        <Box marginBlock="space-16 0" asChild>
          <Button
            /* onClick={() => updateFormState("writable")} */
            data-color-role="brand-blue"
          >
            Send inn
          </Button>
        </Box>
      </form>
    </div>
  );
}

export {
  GodPraksisFeedbackLoginState,
  GodPraksisFeedbackSuccessState,
  GodPraksisFeedbackWriteState,
};
