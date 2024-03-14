import React, { useState } from "react";
import { InboxDownIcon, PersonIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  HGrid,
  HStack,
  Heading,
  Link,
  Textarea,
  VStack,
} from "@navikt/ds-react";
import { AuthUser, UserStateT } from "@/auth/auth.types";
import { useAuth } from "@/auth/useAuth";
import { useSanityData } from "@/hooks/useSanityData";
import { AmplitudeEvents, amplitude } from "@/logging";
import { SlackFeedbackResponse } from "@/slack";
import styles from "./Feedback.module.css";

type States = "feedbackSent" | "loggedIn" | "error";

export const FeedbackForm = ({ user }: { user: AuthUser }) => {
  const [state, setState] = useState<States>("loggedIn");
  const [errorId, setErrorId] = useState<null | string>(null);

  const sanityDocumentId = useSanityData()?.id;
  const { logout } = useAuth();
  const [feedbackCache, setFeedbackCache] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const feedback = (formData.get("feedback") as string) || "";
    setFeedbackCache(feedback);
    const anon = formData.get("anon") === "on";

    if (!feedback) {
      setError("Feltet kan ikke være tomt.");
      return;
    }
    if (feedback.length > 500) {
      setError("Tilbakemeldingen må være under 500 tegn.");
      return;
    }

    const body = JSON.stringify({
      anon,
      feedback: feedback.slice(0, 500) || "",
      document_id: sanityDocumentId,
    });

    fetch("/api/slack/feedback/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((res: SlackFeedbackResponse) => {
        const feedbackMetadata = {
          side: window.location.pathname,
          anonym: anon,
          length: feedback.length,
        };
        if (!res.ok) {
          setErrorId(res.error);
          setState("error");
          amplitude.track(AmplitudeEvents.slackfeedback, {
            result: "error",
            ...feedbackMetadata,
          });
        } else {
          setError(null);
          setState("feedbackSent");
          amplitude.track(AmplitudeEvents.slackfeedback, {
            result: "success",
            ...feedbackMetadata,
          });
        }
      })
      /* TODO: catch */
      .catch();
  };

  if (state === "feedbackSent") {
    return (
      <div>
        <IntroSection
          heading="Innspill sendt"
          description="Ditt innspill er viktig for å holde kvaliteten oppe og innholdet
          relevant. Takk skal du ha!"
        />

        <Button
          onClick={() => setState("loggedIn")}
          className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
        >
          Nytt innspill
        </Button>
      </div>
    );
  }

  if (state === "loggedIn") {
    return (
      <form onSubmit={handleSubmit}>
        {/* vet ikke hvorfor dette kreves her?... noe rarte med styling av Textarea som skjer her? */}
        <style>
          {`
          .navds-textarea__input {
            margin-bottom: var(--a-spacing-2);
          }
        `}
        </style>
        <IntroSection
          heading="Innspill til artikkelen"
          description="Har du innspill til artikkelen? Meldingen blir sendt med Slack til team Aksel og folka som har lagd artikkelen 🙌"
        />
        <VStack gap="4">
          <HStack gap="2">
            <PersonIcon fontSize="1.5rem" />
            <BodyShort>{user.name}</BodyShort>
            <BodyShort>
              (
              <Link
                onClick={() => {
                  logout();
                }}
                href="#"
              >
                logg ut
              </Link>
              )
            </BodyShort>
          </HStack>
          <Checkbox name="anon">Skjul navnet mitt</Checkbox>
          <Textarea
            name="feedback"
            label="Innspill"
            className="justify-items-stretch"
            minRows={4}
            maxLength={500}
            error={error}
            onInput={(element) => {
              if (element.currentTarget.value.length > 500) {
                return;
              }
              setError(null);
            }}
          />
        </VStack>
        <Button
          type="submit"
          className="mt-4 h-11 bg-deepblue-600 hover:bg-deepblue-700"
        >
          Send inn
        </Button>
      </form>
    );
  }

  if (state === "error") {
    return (
      <div>
        <IntroSection
          heading="Noe gikk galt!"
          description="Det skjedde en feil under innsending av tilbakemelding."
        />

        <Heading level="3" size="xsmall" className="mb-1">
          Tilbakemelding
        </Heading>
        {feedbackCache && (
          <BodyLong
            spacing
            className="border-l-2 border-l-border-subtle p-2 pl-4"
          >
            {feedbackCache}
          </BodyLong>
        )}

        <BodyLong>
          Hvis feilen oppstår flere ganger eller du har lyst til å sende
          tilbakemeldingen direkte finner du oss under{" "}
          <Link inlineText href="https://nav-it.slack.com/archives/C7NE7A8UF">
            #aksel-designsystemet
          </Link>{" "}
          på slack.
        </BodyLong>
        <BodyShort
          textColor="subtle"
          size="small"
          className="mt-3"
        >{`Feil-id: ${errorId}`}</BodyShort>
      </div>
    );
  }
  return null;
};

function IntroSection({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <>
      <Heading level="2" id="innspill-form" size="small" className="mb-1">
        {heading}
      </Heading>
      <BodyLong className="mb-6">{description}</BodyLong>
    </>
  );
}

type Props = {
  userState: UserStateT;
};

export const Feedback = ({ userState }: Props) => {
  const { login } = useAuth();

  return (
    <Box
      borderRadius="large"
      background="surface-neutral-subtle"
      className="mt-20"
      padding="6"
    >
      <HGrid columns={{ xs: "1fr 3.5rem", md: "1fr 4.5rem" }} gap="2">
        {userState.signedIn ? (
          <FeedbackForm user={userState.user} />
        ) : (
          <div>
            <IntroSection
              heading="Innspill til artikkelen"
              description="Logg inn med NAV SSO for å gi innspill til artikkelen"
            />
            <Button
              onClick={() => login("#innspill-form")}
              className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
            >
              Logg inn med NAV SSO
            </Button>
          </div>
        )}
        <div className="responsive-svg relative translate-x-[-0.2rem] translate-y-[0.7rem]">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.responsive} ${styles.responsive_square}`}
          >
            <rect
              x="0"
              y="0"
              width="14"
              height="14"
              rx="0.75"
              transform="translate(12.2 2.5) rotate(45 0 0)"
              fill="#D6C3EE"
            />
          </svg>
          <InboxDownIcon
            className={`${styles.responsive} ${styles.responsive_inbox} absolute`}
            aria-hidden
            fontSize="4rem"
          />
        </div>
      </HGrid>
    </Box>
  );
};
