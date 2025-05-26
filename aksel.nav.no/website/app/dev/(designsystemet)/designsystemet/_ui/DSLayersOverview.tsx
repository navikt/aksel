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
    width="100%"
  >
    <VStack gap="space-24">
      <VStack align="center" gap="space-16">
        <Heading level="2" size="large">
          Et fleksibelt system
        </Heading>
        <BodyLong size="large" as="p" align="center">
          Aksel designsystemet består av flere lag
          <br /> som kan brukes enkeltvis eller som en full pakke.
        </BodyLong>
      </VStack>
      <List className="aksel-layers-list">
        <ListItem icon={<SidebarLeftIcon fontSize="24" aria-hidden="true" />}>
          <Link as={NextLink} href="#komponenter">
            Mønster og maler
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem icon={<ComponentIcon fontSize="24" aria-hidden="true" />}>
          <div className="link-group">
            <Link as={NextLink} href="#komponenter">
              Komponenter
            </Link>{" "}
            og{" "}
            <Link as={NextLink} href="#komponenter">
              ikoner
              <DottedLine />
            </Link>
          </div>
        </ListItem>
        <ListItem icon={<Density2Icon fontSize="24" aria-hidden="true" />}>
          <Link as={NextLink} href="#komponenter">
            Layout primitives
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem icon={<TokenIcon fontSize="24" aria-hidden="true" />}>
          <Link as={NextLink} href="#komponenter">
            Design tokens
            <DottedLine />
          </Link>
        </ListItem>
      </List>
    </VStack>
  </BoxNew>
);

export default DSLayersOverview;
