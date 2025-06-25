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
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import { GithubIcon, SlackIcon } from "@/assets/Icons";

type SupportData = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_support"]
>;
type SupportLink = NonNullable<SupportData[number]["link"]>;

type Props = {
  entries: {
    title: SupportData[number]["title"];
    description: SupportData[number]["description"];
    link: {
      href: SupportLink["url"];
      label: SupportLink["text"];
      icon: SupportLink["icon"];
    };
  }[];
};

const Icon = ({ icon }: { icon: Props["entries"][number]["link"]["icon"] }) => {
  if (icon === "Github") {
    return <GithubIcon width="24" height="24" aria-hidden="true" />;
  }
  if (icon === "Slack") {
    return <SlackIcon width="24" height="24" aria-hidden="true" />;
  }
  return null;
};

const SupportSection = ({ entries }: Props) => (
  <VStack gap="space-32" align="center">
    <Heading level="2" size="large">
      Support
    </Heading>
    <HGrid gap="space-24" columns={{ md: 2 }}>
      {entries.map(({ title, description, link }) => (
        <BoxNew
          key={title}
          className="support-section"
          background="brand-blue-soft"
          borderColor="brand-blue-subtle"
          borderWidth="1"
          borderRadius="xlarge"
          paddingBlock="space-16"
          paddingInline="space-24"
          data-color-role="brand-blue"
        >
          <VStack gap="space-40" align="start">
            <div>
              {title && (
                <Heading size="medium" spacing>
                  {title}
                </Heading>
              )}
              {description && (
                <BodyLong size="medium" as="p">
                  {description}
                </BodyLong>
              )}
            </div>
            {link.label && link.href && (
              <HStack gap="space-8" align="start" asChild>
                <Link as={NextLink} href={link.href} variant="neutral">
                  <Icon icon={link.icon} />
                  {link.label}
                </Link>
              </HStack>
            )}
          </VStack>
        </BoxNew>
      ))}
    </HGrid>
  </VStack>
);

export default SupportSection;
