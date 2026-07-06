import {
  BodyShort,
  Box,
  HGrid,
  HStack,
  LinkCard,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { Avatar, avatarUrl } from "@/app/_ui/avatar/Avatar";
import { ChangelogTable } from "@/app/_ui/changelog-table/ChangelogTable";
import { fetchChangelogs } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
import { GithubIcon, SlackIcon } from "@/assets/Icons";
import { formatDateString } from "@/ui-utils/format-date";
import { humanizeRedaksjonType } from "@/ui-utils/format-text";

type ContactT = Exclude<
  KOMPONENT_BY_SLUG_QUERY_RESULT,
  null | undefined
>["contact"];

async function DesignsystemetPageFooter({
  pageId,
  updateDateString,
  contact,
}: {
  pageId: string;
  updateDateString: string;
  contact: ContactT;
}) {
  const updateDate = formatDateString(updateDateString);
  const changelogs = await fetchChangelogs(pageId, "ds");

  return (
    <Box marginBlock="space-48">
      <ChangelogTable changelogs={changelogs} />

      <VStack gap="space-8">
        {contact && (
          <>
            <BodyShort weight="semibold">Forvalter</BodyShort>
            <Avatar
              type={humanizeRedaksjonType(contact.type)}
              name={contact.title ?? ""}
              key={contact.title}
              imageSrc={avatarUrl(contact.avatar_id?.current ?? "missing")}
              showName
            />
          </>
        )}
        {updateDate && (
          <BodyShort size="small" as="span" textColor="subtle">
            {`Artikkel oppdatert ${updateDate}`}
          </BodyShort>
        )}

        <HGrid gap="space-24" columns={{ md: 2 }} data-block-margin="space-28">
          {contact?.github_issues_link && (
            <ContactCard
              title="Rapporter en bug"
              description="Om du har funnet en bug eller noe som ikke henger på greip kan du gi beskjed på Github."
              type="Github"
              href={contact.github_issues_link}
            />
          )}
          {contact?.slack_link && (
            <ContactCard
              title="Slack"
              description="For lavterskel deling og hjelp kan du bruke slack-kanalen for å stille spørsmål og diskutere løsninger."
              type="Slack"
              href={contact.slack_link}
            />
          )}
        </HGrid>
      </VStack>
    </Box>
  );
}

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
          <LinkCardAnchor href={href}>
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

export { DesignsystemetPageFooter };
