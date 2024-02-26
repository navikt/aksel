import React, { Dispatch, SetStateAction } from "react";
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

const FeedbackForm = ({
  state,
  username,
  setSentFeedback,
}: {
  state: Props["state"];
  username: string;
  setSentFeedback?: Dispatch<SetStateAction<boolean>>;
}) => {
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
              setSentFeedback?.(false);
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
          <BodyLong className="mb-6">
            Har du innspill til artikkelen? Meldingen blir sendt med Slack til
            folka som har lagd artikkelen 🙌
          </BodyLong>
          <VStack gap="4">
            <HStack gap="2">
              <PersonIcon fontSize="1.5rem" />
              <BodyShort>{_username}</BodyShort>
              <BodyShort>
                (<Link href="#">logg ut</Link>)
              </BodyShort>
            </HStack>
            <Checkbox>skjul navnet mitt</Checkbox>
            <Textarea
              label="Innspill"
              className="h-40"
              maxLength={500}
            ></Textarea>
          </VStack>
          <Button
            onClick={() => {
              setSentFeedback?.(true);
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
          <Button className="h-11 bg-deepblue-600 hover:bg-deepblue-700">
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
      state?: "public";
      username?: never;
      setSentFeedback?: never;
    }
  | {
      state: "loggedIn";
      username: string;
      setSentFeedback: Dispatch<SetStateAction<boolean>>;
    }
  | {
      state: "feedbackSent";
      username: string;
      setSentFeedback: Dispatch<SetStateAction<boolean>>;
    };

export const Feedback = ({ state, username, setSentFeedback }: Props) => {
  const _state = state || "public";
  return (
    <Box
      borderRadius="large"
      background="surface-neutral-subtle"
      className="mt-20"
      padding="6"
    >
      <HGrid columns="7fr 1fr" gap="5">
        <div>
          <Heading size="small" className="mb-1">
            {_state === "feedbackSent"
              ? "Innspill sendt"
              : "Innspill til artikkelen"}
          </Heading>
          <FeedbackForm
            username={username}
            state={_state}
            setSentFeedback={setSentFeedback}
          />
        </div>
        <div className="relative translate-y-3">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute translate-x-[1.6rem] translate-y-[-0.6rem] scale-110"
          >
            <rect
              x="24.25"
              width="34.4325"
              height="34.4325"
              rx="1.88654"
              transform="rotate(45 24.25 0)"
              fill="#D6C3EE"
            />
          </svg>
          <InboxDownIcon className="absolute" aria-hidden fontSize="4rem" />
        </div>
      </HGrid>
    </Box>
  );
};
