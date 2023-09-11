import { ChevronRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  BoxProps,
  Detail,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { ReactNode } from "react";

const Card = ({
  background,
  borderRadius = "xlarge",
  children,
}: {
  background?: BoxProps["background"];
  borderRadius?: BoxProps["borderRadius"];
  children: ReactNode;
}) => (
  <Box
    padding="4"
    background={background}
    borderColor="border-subtle"
    borderRadius={borderRadius}
    shadow="xsmall"
  >
    <div style={{ width: "20rem" }}>{children}</div>
  </Box>
);

const Example = () => {
  const LinkCard = () => {
    return (
      <>
        <style>
          {`
              .link-card {
                color: var(--navds-color-text-primary);
                text-decoration: none;
              }
              .link-card:hover {
                border-color: var(--a-border-action);
                box-shadow: var(--a-shadow-small);
              }
              .link-card:hover .navds-heading {
                color: var(--a-text-action);
                text-decoration: underline;
              }
              .link-card:hover .link-card__chevron,
              .link-card:focus-within .link-card__chevron {
                transform: translateX(4px);
              }
              .link-card__chevron {
                flex-shrink: 0;
                font-size: 1.5rem;
                transition: transform 200ms;
              }
            `}
        </style>
        <Box
          as="a"
          href="#"
          className="link-card"
          borderRadius="small"
          borderColor="border-default"
          padding="4"
          onClick={() => alert("Clicked!")}
        >
          <HStack gap="4" align="center">
            <VStack gap="2">
              <Heading size="medium">
                LinkCard som bruker Box, HStack og VStack
              </Heading>
              <BodyLong>This truly is inside a box!</BodyLong>
            </VStack>
            <ChevronRightIcon fontSize={24} className="link-card__chevron" />
          </HStack>
        </Box>
      </>
    );
  };

  const ChatBubble = () => {
    return (
      <>
        <Box
          background="surface-neutral-subtle"
          shadow="xsmall"
          padding="4"
          borderRadius="xlarge xlarge 0 xlarge"
        >
          <VStack gap="2">
            <Detail>BOX • 01.01.21 14:00</Detail>
            <BodyLong>
              Hei! Dette er en chatbobble som bruker Box som base!
            </BodyLong>
          </VStack>
        </Box>
      </>
    );
  };

  const PricePill = () => {
    return (
      <>
        <style>
          {`
                .old-price {
                  text-decoration: line-through;
                }
                .pill-section {
                    min-width: 8rem;
                }
              `}
        </style>
        <HStack>
          <Box
            className="pill-section"
            background="surface-success-subtle"
            shadow="xsmall"
            padding="5"
            borderRadius="full 0 0 full"
          >
            <VStack align="center">
              <Detail>Ny pris</Detail>
              <Heading size="medium">1 kr</Heading>
            </VStack>
          </Box>
          <Box
            className="pill-section"
            background="surface-danger-subtle"
            shadow="xsmall"
            padding="4"
            borderRadius="0 full full 0"
          >
            <VStack align="center">
              <Detail>Førpris</Detail>
              <Heading className="old-price" size="medium">
                399.99 kr
              </Heading>
            </VStack>
          </Box>
        </HStack>
      </>
    );
  };

  return (
    <VStack gap="8">
      <Card>Dette er et Card som bruker Box som base</Card>
      <LinkCard />
      <ChatBubble />
      <PricePill />
    </VStack>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Box lar deg lage en boks med padding, border og bakgrunn. Den kan brukes til å gruppere innhold, eller som en dekorativ boks.",
};
