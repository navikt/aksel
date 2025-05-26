import Link from "next/link";
import { Bleed, BodyLong, HStack, Heading, VStack } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import { GithubIcon } from "@/assets/Icons";

const changes = [
  {
    title: "Aksel@7.16.0",
    description: "6. februar 2025",
  },
  {
    title: "Aksel@7.15.0",
    description: "23. mars 2025",
  },
  {
    title: "Aksel@7.14.0",
    description: "14. april 2025",
  },
];

const ChangeLogNews = () => (
  <Bleed marginInline="full">
    <VStack gap="space-32" as="section">
      <VStack gap="space-8" align="center">
        <Heading level="2" size="large">
          Endringslogg
        </Heading>
        <BodyLong size="large" as="p">
          Siste endringer i kode.{" "}
          <Link href="/dev/designsystemet/endringslogg">Se alle endringer</Link>
          .
        </BodyLong>
      </VStack>
      <HStack gap="space-24">
        {changes.map(({ title, description }) => (
          <LinkCard key={title} hasArrow={false}>
            <LinkCardTitle as="span">{title}</LinkCardTitle>
            <LinkCardDescription>{description}</LinkCardDescription>
            <LinkCardIcon>
              <GithubIcon width="32" height="32" aria-hidden="true" />
            </LinkCardIcon>
          </LinkCard>
        ))}
      </HStack>
    </VStack>
  </Bleed>
);

export default ChangeLogNews;
