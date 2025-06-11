import NextLink from "next/link";
import {
  ComponentIcon,
  Density2Icon,
  SidebarLeftIcon,
  TokenIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  BoxNew,
  Heading,
  Link,
  List,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";

const DottedLine = () => (
  <div className="aksel__ds-frontpage__dotted-line" aria-hidden="true" />
);

const DSLayersOverview = () => (
  <BoxNew
    background="brand-blue-soft"
    borderColor="brand-blue-subtle"
    borderWidth="1"
    borderRadius="xlarge"
    padding="space-40"
    maxWidth="768px"
    width="100%"
  >
    <VStack gap="space-24" align="center">
      <VStack align="center" gap="space-16">
        <Heading level="2" size="large">
          Et fleksibelt system
        </Heading>
        <BodyLong size="large" as="p" align="center">
          Aksel designsystemet består av flere lag
          <br /> som kan brukes enkeltvis eller som en full pakke.
        </BodyLong>
      </VStack>
      <BoxNew
        paddingBlock="space-24 0"
        maxWidth="600px"
        width="100%"
        paddingInline="0 space-32"
      >
        <List className="aksel-layers-list">
          <ListItem icon={<SidebarLeftIcon fontSize="24" aria-hidden="true" />}>
            <Link
              as={NextLink}
              href="/dev/monster-maler/stotte/404-side"
              variant="neutral"
            >
              Mønster og maler
              <DottedLine />
            </Link>
          </ListItem>
          <ListItem icon={<ComponentIcon fontSize="24" aria-hidden="true" />}>
            <div className="link-group">
              <Link
                as={NextLink}
                href="/dev/komponenter/core"
                variant="neutral"
              >
                Komponenter
              </Link>{" "}
              og{" "}
              <Link
                as={NextLink}
                href="/dev/komponenter/ikoner"
                variant="neutral"
              >
                ikoner
                <DottedLine />
              </Link>
            </div>
          </ListItem>
          <ListItem icon={<Density2Icon fontSize="24" aria-hidden="true" />}>
            <Link
              as={NextLink}
              href="/dev/komponenter/primitives"
              variant="neutral"
            >
              Layout primitives
              <DottedLine />
            </Link>
          </ListItem>
          <ListItem icon={<TokenIcon fontSize="24" aria-hidden="true" />}>
            <Link
              as={NextLink}
              href="/dev/grunnleggende/darkside/design-tokens"
              variant="neutral"
            >
              Design tokens
              <DottedLine />
            </Link>
          </ListItem>
        </List>
      </BoxNew>
    </VStack>
  </BoxNew>
);

export default DSLayersOverview;
