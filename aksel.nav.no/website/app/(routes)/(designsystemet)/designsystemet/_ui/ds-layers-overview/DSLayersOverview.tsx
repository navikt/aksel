import {
  ComponentIcon,
  Density2Icon,
  SidebarLeftIcon,
  TokenIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  Heading,
  Link,
  LinkCard,
  List,
  Show,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { ListItem } from "@navikt/ds-react/List";
import { HolidayDecorations } from "@/app/_ui/holiday-deco/HolidayDecorations";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import styles from "./DSLayersOverview.module.css";

type DSLayersOverviewProps = {
  title: string;
  description?: string;
};

const DSLayersOverview = ({ title, description }: DSLayersOverviewProps) => (
  <Box
    background="brand-blue-soft"
    borderColor="brand-blue-subtle"
    borderWidth="1"
    borderRadius="12"
    padding={{ xs: "space-16", md: "space-40" }}
    width="100%"
    position="relative"
    asChild
  >
    <VStack gap={{ xs: "space-24", md: "space-64" }} align="center">
      <HolidayDecorations type={{ name: "tree", right: true }} />
      <VStack align="center" gap="space-16" maxWidth="400px">
        <Heading level="2" size="large">
          {title}
        </Heading>
        {description && (
          <BodyLong size="large" align="center">
            {description}
          </BodyLong>
        )}
      </VStack>
      <Show above="md" asChild>
        <IllustratedLinks />
      </Show>
      <Show below="md" asChild>
        <LinkCardLinks />
      </Show>
    </VStack>
  </Box>
);

const Links = {
  monsterMaler: {
    href: "/monster-maler",
    label: "Mønster og maler",
    icon: <SidebarLeftIcon fontSize="24" aria-hidden="true" />,
  },
  komponenter: {
    href: "/komponenter/core",
    label: "Komponenter",
    icon: <ComponentIcon fontSize="24" aria-hidden="true" />,
  },
  ikoner: {
    href: "/komponenter/ikoner",
    label: "Ikoner",
    icon: <ComponentIcon fontSize="24" aria-hidden="true" />,
  },
  layoutPrimitives: {
    href: "/komponenter/primitives",
    label: "Layout primitives",
    icon: <Density2Icon fontSize="24" aria-hidden="true" />,
  },
  designTokens: {
    href: "/grunnleggende/styling/design-tokens",
    label: "Design tokens",
    icon: <TokenIcon fontSize="24" aria-hidden="true" />,
  },
};

function IllustratedLinks() {
  return (
    <Box
      maxWidth="600px"
      width="100%"
      paddingInline={{ xs: "space-0", md: "space-0 space-32" }}
    >
      <List className={styles.akselLayersList}>
        <ListItem
          className={`${styles.akselLayersListItem} ${styles.akselLayersIllustrativeListItem}`}
          icon={Links.monsterMaler.icon}
        >
          <Link
            as={NextLink}
            className={styles.akselLayersLink}
            href={Links.monsterMaler.href}
            variant="neutral"
          >
            <BodyShort
              className={styles.akselLayersLinkText}
              as="span"
              weight="semibold"
              size="large"
            >
              {Links.monsterMaler.label}
            </BodyShort>
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem
          className={`${styles.akselLayersListItem} ${styles.akselLayersIllustrativeListItem}`}
          icon={Links.komponenter.icon}
        >
          <div className={styles.akselLayersListItemLinkGroup}>
            <Link
              as={NextLink}
              className={styles.akselLayersLink}
              href={Links.komponenter.href}
              variant="neutral"
            >
              <BodyShort
                className={styles.akselLayersLinkText}
                as="span"
                weight="semibold"
                size="large"
              >
                {Links.komponenter.label}
              </BodyShort>
            </Link>{" "}
            og{" "}
            <Link
              as={NextLink}
              className={styles.akselLayersLink}
              href={Links.ikoner.href}
              variant="neutral"
            >
              <BodyShort
                className={styles.akselLayersLinkText}
                as="span"
                weight="semibold"
                size="large"
              >
                {Links.ikoner.label}
              </BodyShort>
              <DottedLine />
            </Link>
          </div>
        </ListItem>
        <ListItem
          className={`${styles.akselLayersListItem} ${styles.akselLayersIllustrativeListItem}`}
          icon={Links.layoutPrimitives.icon}
        >
          <Link
            as={NextLink}
            className={styles.akselLayersLink}
            href={Links.layoutPrimitives.href}
            variant="neutral"
          >
            <BodyShort
              className={styles.akselLayersLinkText}
              as="span"
              weight="semibold"
              size="large"
            >
              {Links.layoutPrimitives.label}
            </BodyShort>
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem
          className={`${styles.akselLayersListItem} ${styles.akselLayersIllustrativeListItem}`}
          icon={Links.designTokens.icon}
        >
          <Link
            as={NextLink}
            className={styles.akselLayersLink}
            href={Links.designTokens.href}
            variant="neutral"
          >
            <BodyShort
              className={styles.akselLayersLinkText}
              as="span"
              weight="semibold"
              size="large"
            >
              {Links.designTokens.label}
            </BodyShort>
            <DottedLine />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
}

function LinkCardLinks() {
  return (
    <VStack gap="space-16" width="100%">
      {Object.entries(Links).map(([key, { href, label, icon }]) => (
        <Box key={key} background="brand-blue-moderateA" asChild>
          <LinkCard>
            <LinkCardIcon>{icon}</LinkCardIcon>
            <LinkCardTitle data-color="neutral">
              <LinkCardAnchor href={href}>{label}</LinkCardAnchor>
            </LinkCardTitle>
          </LinkCard>
        </Box>
      ))}
    </VStack>
  );
}

function DottedLine() {
  return <div className={styles.akselLayersDottedLine} aria-hidden="true" />;
}

export { DSLayersOverview };
