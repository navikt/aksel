import NextLink from "next/link";
import React from "react";
import {
  CodeIcon,
  ComponentIcon,
  Density2Icon,
  PaletteIcon,
  SidebarLeftIcon,
  TokenIcon,
} from "@navikt/aksel-icons";
import {
  Bleed,
  BodyLong,
  BoxNew,
  HStack,
  Heading,
  Link,
  List,
  Page,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { PageBlock } from "@navikt/ds-react/Page";
import {
  LinkCard,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";
import "./ds-forside.css";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const DottedLine = () => (
  <div className="aksel__ds-frontpage__dotted-line" aria-hidden="true" />
);

const DesignsystemetPage = async () => {
  return (
    <Page>
      <PageBlock as="main" width="md" gutters>
        <VStack align="center" gap="space-80">
          <VStack gap="space-48" paddingBlock="space-24">
            <VStack gap="space-16" maxWidth="600px" align="center">
              <VStack gap="space-8">
                <Tag variant="success">
                  Ny versjon av Aksel er ute (darkside)
                </Tag>
                <Heading level="1" size="xlarge">
                  Aksel designsystemet
                </Heading>
              </VStack>
              <BodyLong size="large" as="p" align="center">
                Aksel er designsystemet til Navs produktutvikling, en samling
                med designtokens, dokumenterte komponenter, maler og guider. En
                komplett plattform for å lage førsteklasses grensesnitt
              </BodyLong>
            </VStack>
            <Bleed marginInline="full">
              <HStack gap="space-24" justify="center">
                <LinkCard hasArrow={false}>
                  <LinkCardTitle as="h2">Start med design</LinkCardTitle>
                  <LinkCardDescription>
                    Figma-filer og kreative arenaer
                  </LinkCardDescription>
                  <LinkCardIcon>
                    <PaletteIcon fontSize="48" />
                  </LinkCardIcon>
                </LinkCard>
                <LinkCard hasArrow={false}>
                  <LinkCardTitle as="h2">Start med utvikling</LinkCardTitle>
                  <LinkCardDescription>
                    Installasjon og tips
                  </LinkCardDescription>
                  <LinkCardIcon>
                    <CodeIcon fontSize="48" />
                  </LinkCardIcon>
                </LinkCard>
              </HStack>
            </Bleed>
          </VStack>
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
                <ListItem
                  icon={<SidebarLeftIcon fontSize="24" aria-hidden="true" />}
                >
                  <Link as={NextLink} href="#komponenter">
                    Mønster og maler
                    <DottedLine />
                  </Link>
                </ListItem>
                <ListItem
                  icon={<ComponentIcon fontSize="24" aria-hidden="true" />}
                >
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
                <ListItem
                  icon={<Density2Icon fontSize="24" aria-hidden="true" />}
                >
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
        </VStack>
      </PageBlock>
    </Page>
  );
};

export default DesignsystemetPage;
