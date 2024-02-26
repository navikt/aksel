import { InboxDownIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, HGrid, Heading } from "@navikt/ds-react";

export const Feedback = () => {
  return (
    <Box
      borderRadius="large"
      background="surface-neutral-subtle"
      className="mt-20"
      padding="6"
    >
      <HGrid columns="7fr 1fr">
        <div>
          <Heading size="small" className="mb-1">
            Innspill til artikkelen
          </Heading>
          <BodyLong className="mb-6">
            Logg inn med NAV SSO for å gi innspill til artikkelen
          </BodyLong>
          <Button className="h-11 bg-deepblue-600 hover:bg-deepblue-700">
            Logg inn med NAV SSO
          </Button>
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
