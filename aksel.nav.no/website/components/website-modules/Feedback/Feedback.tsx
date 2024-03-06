import React, { Dispatch, SetStateAction, useState } from "react";
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
import { useAuth } from "@/auth/useAuth";
import styles from "./Feedback.module.css";

type States = "public" | "feedbackSent" | "loggedIn";

const FeedbackForm = ({
  username,
  state,
  setState,
}: {
  username?: string | null;
  state: States;
  setState?: Dispatch<SetStateAction<States>>;
}) => {
  const { login, logout } = useAuth();

  let form: React.ReactNode = null;
  const _username = username || "Ukjent bruker";

  switch (state) {
    case "feedbackSent":
      form = (
        <>
          <BodyLong className="mb-6">
            Ditt innspill er viktig for å holde kvaliteten oppe og innholdet
            relevant. Takk skal du ha!
          </BodyLong>
          <Button
            onClick={() => {
              setState?.("loggedIn");
            }}
            className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
          >
            Nytt innspill
          </Button>
        </>
      );
      break;

    case "loggedIn":
      form = (
        <>
          {/* vet ikke hvorfor dette kreves her?... noe rarte med styling av Textarea som skjer her? */}
          <style>
            {`
            .navds-textarea__input {
              margin-bottom: var(--a-spacing-2);
            }
          `}
          </style>
          <BodyLong className="mb-6">
            Har du innspill til artikkelen? Meldingen blir sendt med Slack til
            folka som har lagd artikkelen 🙌
          </BodyLong>
          <VStack gap="4">
            <HStack gap="2">
              <PersonIcon fontSize="1.5rem" />
              <BodyShort>{_username}</BodyShort>
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
            <Checkbox>skjul navnet mitt</Checkbox>
            <Textarea
              label="Innspill"
              className="h-40 justify-items-stretch"
              maxLength={500}
            ></Textarea>
          </VStack>
          <Button
            onClick={() => {
              setState?.("feedbackSent");
              // send to API route
            }}
            className="mt-4 h-11 bg-deepblue-600 hover:bg-deepblue-700"
          >
            Send inn
          </Button>
        </>
      );
      break;

    case "public":
    default:
      form = (
        <>
          <BodyLong className="mb-6">
            Logg inn med NAV SSO for å gi innspill til artikkelen
          </BodyLong>
          <Button
            onClick={() => {
              login("#innspill-form");
            }}
            className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
          >
            Logg inn med NAV SSO
          </Button>
        </>
      );
      break;
  }

  return form;
};

type Props =
  | {
      username?: never;
    }
  | {
      username: string | null;
    };

export const Feedback = ({ username }: Props) => {
  const [state, setState] = useState<States>(username ? "loggedIn" : "public");

  return (
    <Box
      borderRadius="large"
      background="surface-neutral-subtle"
      className="mt-20"
      padding="6"
    >
      <HGrid columns={{ xs: "1fr 3.5rem", md: "1fr 4.5rem" }} gap="2">
        <div>
          <Heading id="innspill-form" size="small" className="mb-1">
            {state === "feedbackSent"
              ? "Innspill sendt"
              : "Innspill til artikkelen"}
          </Heading>
          <FeedbackForm username={username} state={state} setState={setState} />
        </div>
        <div className="responsive-svg relative translate-x-[-0.2rem] translate-y-[0.7rem]">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.responsive} ${styles.responsive_square}`} //responsive-svg absolute translate-x-[0.8rem] translate-y-[-0.8rem] scale-110
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
