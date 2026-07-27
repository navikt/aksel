import { BodyShort, Box, HGrid, VStack } from "@navikt/ds-react";
import { ContactCard } from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetContactCard";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { Avatar, avatarUrl } from "@/app/_ui/avatar/Avatar";
import { ChangelogTable } from "@/app/_ui/changelog-table/ChangelogTable";
import { fetchChangelogs } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
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
              description="For lavterskel deling og hjelp kan du bruke Slack-kanalen for å stille spørsmål og diskutere løsninger."
              type="Slack"
              href={contact.slack_link}
            />
          )}
        </HGrid>
      </VStack>
    </Box>
  );
}

export { DesignsystemetPageFooter };
