import React, { useState } from "react";
import { InboxDownIcon, PersonIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  Link,
  Textarea,
  VStack,
} from "@navikt/ds-react";
import { AuthUser, UserStateT } from "@/auth/auth.types";
import { useAuth } from "@/auth/useAuth";
import { SlackFeedbackResponse } from "@/slack";
import { useSanityData } from "../SanityDataProvider";
import styles from "./Feedback.module.css";

type States = "feedbackSent" | "loggedIn" | "error" | "submittingForm";

export const FeedbackForm = ({ user }: { user: AuthUser }) => {
  const [state, setState] = useState<States>("loggedIn");
  const [APIError, setAPIError] = useState<null | string>(null);

  const sanityDocumentId = useSanityData()?.id;
  const { logout } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loggedIn");

    const formData = new FormData(event.currentTarget);
    const feedback = (formData.get("feedback") as string) || "";

    if (!feedback) {
      setFormError("Feltet kan ikke være tomt.");
      return;
    }
    if (feedback.length > 500) {
      setFormError("Tilbakemeldingen må være under 500 tegn.");
      return;
    }

    const body = JSON.stringify({
      feedback: feedback.slice(0, 500) || "",
      document_id: sanityDocumentId,
    });

    setState("submittingForm");
    fetch("/api/slack/feedback/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((res: SlackFeedbackResponse) => {
        if (!res.ok) {
          setAPIError(res.error);
          setState("error");

          window.umami &&
            umami.track("skjema validering feilet", {
              skjemanavn: "slack-feedback",
              skjemaId: sanityDocumentId,
            });
        } else {
          setFormError(null);
          setState("feedbackSent");

          window.umami &&
            umami.track("skjema fullfort", {
              skjemanavn: "slack-feedback",
              skjemaId: sanityDocumentId,
            });
        }
      })
      .catch(() => {
        setAPIError("unknownError");
        setState("error");
        window.umami &&
          umami.track("skjema validering feilet", {
            skjemanavn: "slack-feedback",
            skjemaId: sanityDocumentId,
          });
      });
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
          className="bg-deepblue-600 hover:bg-deepblue-700 active:bg-deepblue-700"
        >
          Nytt innspill
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <IntroSection
        heading="Innspill til artikkelen"
        description="Har du innspill til artikkelen? Meldingen blir sendt med Slack til team Aksel og folka som har lagd artikkelen 🙌"
      />
      <VStack gap="4">
        <HStack gap="2">
          <PersonIcon aria-hidden fontSize="1.5rem" />
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
        <Textarea
          name="feedback"
          label="Innspill"
          minRows={4}
          maxLength={500}
          error={formError}
          onInput={(element) => {
            if (element.currentTarget.value.length > 500) {
              return;
            }
            setFormError(null);
          }}
        />
      </VStack>
      <Button
        type="submit"
        loading={state === "submittingForm"}
        className="mt-4 bg-deepblue-600 hover:bg-deepblue-700 active:bg-deepblue-700"
      >
        Send inn
      </Button>

      {state === "error" && (
        <Alert variant="error" className="mt-4" role="alert">
          Noe gikk galt. Hvis feilen oppstår flere ganger eller du har lyst til
          å sende tilbakemeldingen direkte finner du oss under{" "}
          <Link inlineText href="https://nav-it.slack.com/archives/C7NE7A8UF">
            #aksel-designsystemet
          </Link>{" "}
          på slack.
          <BodyShort
            textColor="subtle"
            size="small"
            className="mt-3"
          >{`Feil-id: ${APIError}`}</BodyShort>
        </Alert>
      )}
    </form>
  );
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
      <Heading
        level="2"
        tabIndex={-1}
        id="scrollToFeedback"
        size="small"
        className="mb-1 focus:outline-none"
      >
        {heading}
      </Heading>
      <BodyLong className="mb-4">{description}</BodyLong>
    </>
  );
}

type Props = {
  userState: UserStateT;
};

export const Feedback = ({ userState }: Props) => {
  const { login } = useAuth(true);

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
              description="Logg inn med Nav SSO for å gi innspill til artikkelen"
            />
            <Button
              onClick={() => login()}
              className="bg-deepblue-600 hover:bg-deepblue-700 active:bg-deepblue-700"
            >
              Logg inn med Nav SSO
            </Button>
          </div>
        )}
        <div className="responsive-svg relative translate-x-[-0.2rem] translate-y-[0.7rem]">
          <svg
            aria-hidden
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
