"use client";
import { stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import { Box, HStack, LinkCard } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { GithubIcon, SlackIcon } from "@/assets/Icons";

type ContactCardT = {
  title: string;
  description: string;
  type: "Github" | "Slack";
  href: string;
};

const Icon = ({ icon }: { icon: ContactCardT["type"] }) => {
  if (icon === "Github") {
    return <GithubIcon width="24" height="24" aria-hidden="true" />;
  }
  if (icon === "Slack") {
    return <SlackIcon width="24" height="24" aria-hidden="true" />;
  }
  return null;
};

function ContactCard(props: ContactCardT) {
  const { title, description, type, href } = props;
  return (
    <Box
      background="brand-blue-soft"
      borderWidth="1"
      borderRadius="12"
      paddingBlock="space-16"
      paddingInline="space-24"
      data-color="brand-blue"
      asChild
    >
      <LinkCard arrow={false}>
        <LinkCardTitle data-color="neutral">{title}</LinkCardTitle>
        <LinkCardDescription>{description}</LinkCardDescription>
        <LinkCardFooter>
          <LinkCardAnchor
            href={href}
            onClick={() => {
              umamiTrack(Events.NAVIGERE, {
                lenketekst: title,
                destinasjon: stegaClean(props.href),
                lenkegruppe: "ds-kontaktkort",
              });
            }}
          >
            <HStack gap="space-8" as="span" align="center">
              <Icon icon={type} />
              {title}
            </HStack>
          </LinkCardAnchor>
        </LinkCardFooter>
      </LinkCard>
    </Box>
  );
}

export { ContactCard };
