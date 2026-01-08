"use client";

import { usePathname } from "next/dist/client/components/navigation";
import { useState, useTransition } from "react";
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
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { FormState, sendFeedbackAction } from "./actions";
import { zodFormDataSchema } from "./actions.zod";

function GodPraksisFeedbackLogin() {
  const pathname = usePathname();

  return (
    <div>
      <Heading
        level="2"
        size="small"
        data-aksel-heading-color
        tabIndex={-1}
        id="scrollToFeedback"
      >
        Innspill til artikkelen
      </Heading>
      <Box asChild paddingBlock="space-4 space-24">
        <BodyLong>
          Logg inn med Nav SSO for å gi innspill til artikkelen
        </BodyLong>
      </Box>
      <Button
        as="a"
        href={`/oauth2/login?redirect=${
          pathname?.split("#")[0]
        }${encodeURIComponent("#scrollToFeedback")}`}
        data-color="brand-blue"
      >
        Logg inn med Nav SSO
      </Button>
    </div>
  );
}

function GodPraksisFeedbackForm({
  docId,
  name,
}: {
  docId: string;
  name?: string;
}) {
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState<FormState>({
    value: "writing",
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const validatedFormData = zodFormDataSchema.safeParse({
      feedback: formData.get("feedback"),
      docId,
    });

    if (!validatedFormData.success) {
      const feedbackError = validatedFormData.error
        .flatten()
        .fieldErrors.feedback?.join(",");

      /* If error is unrelated to the feedback-message itself, something on the system-side failed */
      if (!feedbackError) {
        setFormState({
          value: "error",
          error: "Noe gikk galt ved innsending, ta kontakt med team Aksel",
        });

        umamiTrack("skjema validering feilet", {
          skjemanavn: "slack-feedback",
          skjemaId: docId,
        });

        return;
      }

      setFormState({
        value: "writing",
        error: feedbackError,
      });

      return;
    }

    startTransition(async () => {
      const result = await sendFeedbackAction(
        validatedFormData.data.feedback,
        validatedFormData.data.docId,
      );

      if (result.value === "error") {
        setFormState({
          value: "error",
          error: result.error,
        });

        umamiTrack("skjema validering feilet", {
          skjemanavn: "slack-feedback",
          skjemaId: docId,
        });
        return;
      }

      setFormState({
        value: "sent",
        error: null,
      });

      umamiTrack("skjema fullfort", {
        skjemanavn: "slack-feedback",
        skjemaId: docId,
      });
    });
  };

  if (formState.value === "error") {
    return (
      <div>
        <Heading level="2" size="small" data-aksel-heading-color>
          Noe gikk galt!
        </Heading>
        <Box asChild paddingBlock="space-4 space-0">
          <BodyLong>
            Det oppstod en feil ved innsending av tilbakemeldingen. Prøv igjen
            senere, eller ta kontakt med team Aksel på slack{" "}
            <Link inlineText href="https://nav-it.slack.com/archives/C7NE7A8UF">
              #aksel-designsystemet
            </Link>
          </BodyLong>
        </Box>
      </div>
    );
  }

  if (formState.value === "sent") {
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
          onClick={() => setFormState({ value: "writing", error: null })}
          disabled={isPending}
          data-color="brand-blue"
        >
          Nytt innspill
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Heading
        level="2"
        size="small"
        data-aksel-heading-color
        tabIndex={-1}
        id="scrollToFeedback"
      >
        Innspill til artikkelen
      </Heading>
      <Box asChild paddingBlock="space-4 space-24">
        <BodyLong>
          Har du innspill til artikkelen? Meldingen blir sendt med Slack til
          folka som har lagd artikkelen 🙌
        </BodyLong>
      </Box>
      <HStack gap="space-8" paddingBlock="space-0 space-24">
        <PersonIcon aria-hidden fontSize="1.5rem" />
        <BodyShort>{name}</BodyShort>

        <Link data-color="neutral" href={`/oauth2/logout?redirect=${pathname}`}>
          (logg ut)
        </Link>
      </HStack>
      <form onSubmit={handleSubmit}>
        <Textarea
          name="feedback"
          label="Innspill"
          minRows={4}
          maxLength={500}
          error={formState.error}
          onInput={(element) => {
            if (element.currentTarget.value.length > 500) {
              return;
            }
            setFormState({
              value: "writing",
              error: null,
            });
          }}
        />
        <Box marginBlock="space-16 space-0" asChild>
          <Button type="submit" data-color="brand-blue" disabled={isPending}>
            Send inn
          </Button>
        </Box>
      </form>
    </div>
  );
}

export { GodPraksisFeedbackForm, GodPraksisFeedbackLogin };
