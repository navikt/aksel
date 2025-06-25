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
import "./DSLayersOverview.css";

type DSLayersOverviewProps = {
  title: string;
  description?: string;
};

const DSLayersOverview = ({ title, description }: DSLayersOverviewProps) => (
  <BoxNew
    background="brand-blue-soft"
    borderColor="brand-blue-subtle"
    borderWidth="1"
    borderRadius="12"
    padding={{ xs: "space-16", md: "space-40" }}
    width="100%"
    asChild
  >
    <VStack gap={{ xs: "space-24", md: "space-64" }} align="center">
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
  </BoxNew>
);

const Links = {
  monsterMaler: {
    href: "/dev/monster-maler",
    label: "Mønster og maler",
    icon: <SidebarLeftIcon fontSize="24" aria-hidden="true" />,
  },
  komponenter: {
    href: "/dev/komponenter/core",
    label: "Komponenter",
    icon: <ComponentIcon fontSize="24" aria-hidden="true" />,
  },
  ikoner: {
    href: "/dev/komponenter/ikoner",
    label: "Ikoner",
    icon: <ComponentIcon fontSize="24" aria-hidden="true" />,
  },
  layoutPrimitives: {
    href: "/dev/komponenter/primitives",
    label: "Layout primitives",
    icon: <Density2Icon fontSize="24" aria-hidden="true" />,
  },
  designTokens: {
    href: "/dev/grunnleggende/darkside/design-tokens",
    label: "Design tokens",
    icon: <TokenIcon fontSize="24" aria-hidden="true" />,
  },
};

function IllustratedLinks() {
  return (
    <BoxNew
      maxWidth="600px"
      width="100%"
      paddingInline={{ xs: "0", md: "0 space-32" }}
    >
      <List className="aksel-layers-list">
        <ListItem icon={Links.monsterMaler.icon}>
          <Link as={NextLink} href={Links.monsterMaler.href} variant="neutral">
            {Links.monsterMaler.label}
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem icon={Links.komponenter.icon}>
          <div className="link-group">
            <Link as={NextLink} href={Links.komponenter.href} variant="neutral">
              {Links.komponenter.label}
            </Link>{" "}
            og{" "}
            <Link as={NextLink} href={Links.ikoner.href} variant="neutral">
              {Links.ikoner.label}
              <DottedLine />
            </Link>
          </div>
        </ListItem>
        <ListItem icon={Links.layoutPrimitives.icon}>
          <Link
            as={NextLink}
            href={Links.layoutPrimitives.href}
            variant="neutral"
          >
            {Links.layoutPrimitives.label}
            <DottedLine />
          </Link>
        </ListItem>
        <ListItem icon={Links.designTokens.icon}>
          <Link as={NextLink} href={Links.designTokens.href} variant="neutral">
            {Links.designTokens.label}
            <DottedLine />
          </Link>
        </ListItem>
      </List>
    </BoxNew>
  );
}

function LinkCardLinks() {
  return (
    <VStack gap="space-16" width="100%">
      {Object.entries(Links).map(([key, { href, label, icon }]) => (
        <BoxNew key={key} background="brand-blue-moderateA" asChild>
          <LinkCard data-color="brand-blue">
            <LinkCardIcon>{icon}</LinkCardIcon>
            <LinkCardTitle data-color="neutral">
              <LinkCardAnchor href={href}>{label}</LinkCardAnchor>
            </LinkCardTitle>
          </LinkCard>
        </BoxNew>
      ))}
    </VStack>
  );
}

function DottedLine() {
  return (
    <div className="aksel__ds-frontpage__dotted-line" aria-hidden="true" />
  );
}

export { DSLayersOverview };
