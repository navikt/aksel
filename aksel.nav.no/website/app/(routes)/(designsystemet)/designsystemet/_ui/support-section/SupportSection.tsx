import {
  BoxNew,
  HGrid,
  HStack,
  Heading,
  LinkCard,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { DS_FRONT_PAGE_QUERY_RESULT } from "@/app/_sanity/query-types";
import { GithubIcon, SlackIcon } from "@/assets/Icons";

type SupportData = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERY_RESULT>["ds_support"]
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
          borderWidth="1"
          borderRadius="xlarge"
          paddingBlock="space-16"
          paddingInline="space-24"
          data-color="brand-blue"
          asChild
        >
          <LinkCard arrow={false}>
            {title && (
              <LinkCardTitle data-color="neutral">{title}</LinkCardTitle>
            )}
            {description && (
              <LinkCardDescription>{description}</LinkCardDescription>
            )}
            {link.label && link.href && (
              <LinkCardFooter>
                <LinkCardAnchor href={link.href}>
                  <HStack gap="space-8" as="span" align="center">
                    <Icon icon={link.icon} />
                    {link.label}
                  </HStack>
                </LinkCardAnchor>
              </LinkCardFooter>
            )}
          </LinkCard>
        </BoxNew>
      ))}
    </HGrid>
  </VStack>
);

export default SupportSection;
