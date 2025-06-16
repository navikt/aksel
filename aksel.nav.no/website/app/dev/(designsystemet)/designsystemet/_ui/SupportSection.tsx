import NextLink from "next/link";
import {
  BodyLong,
  BoxNew,
  HGrid,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { GithubIcon, SlackIcon } from "@/assets/Icons";
import "./SupportSection.css";

const supportModules = [
  {
    title: "Rapporter en bug",
    description:
      "Om du har funnet en bug eller noe som ikke henger på greip kan du gi oss beskjed på GitHub.",
    link: {
      href: "#github",
      label: "Rapporter en bug",
      icon: <GithubIcon width="24" height="24" aria-hidden="true" />,
    },
  },
  {
    title: "Vi blir bedre sammen",
    description:
      "Bli med på Slack der alle hjelper hverandre med kode, design og gode råd.",
    link: {
      href: "#slack",
      label: "Gå til kanalen",
      icon: <SlackIcon width="24" height="24" aria-hidden="true" />,
    },
  },
];

const SupportSection = () => (
  <VStack gap="space-16" align="center" className="support-section">
    <Heading level="2" size="large">
      Support
    </Heading>
    <HGrid gap="space-24" columns={2}>
      {supportModules.map(({ title, description, link }) => (
        <BoxNew
          key={title}
          background="brand-blue-strong"
          borderColor="brand-blue-subtle"
          borderWidth="1"
          borderRadius="xlarge"
          paddingBlock="space-16"
          paddingInline="space-24"
          data-color-role="brand-blue"
        >
          <VStack gap="space-40" align="start">
            <div>
              <Heading size="medium" spacing>
                {title}
              </Heading>
              <BodyLong size="medium" as="p">
                {description}
              </BodyLong>
            </div>
            <HStack gap="space-8" align="start" asChild>
              <Link as={NextLink} href={link.href}>
                {link.icon}
                {link.label}
              </Link>
            </HStack>
          </VStack>
        </BoxNew>
      ))}
    </HGrid>
  </VStack>
);

export default SupportSection;
