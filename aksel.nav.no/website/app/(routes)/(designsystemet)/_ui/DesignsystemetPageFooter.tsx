import { BodyShort, HGrid, Heading, VStack } from "@navikt/ds-react";
import { ContactCard } from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetContactCard";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { Avatar, avatarUrl } from "@/app/_ui/avatar/Avatar";
import { formatDateString } from "@/ui-utils/format-date";
import { humanizeRedaksjonType } from "@/ui-utils/format-text";

type ContactT = Exclude<
  KOMPONENT_BY_SLUG_QUERY_RESULT,
  null | undefined
>["contact"];

async function DesignsystemetPageFooter({
  updateDateString,
  contact,
  pageTitle,
}: {
  updateDateString: string;
  contact: ContactT;
  pageTitle?: string;
}) {
  const updateDate = formatDateString(updateDateString);

  const suffix = `title=%5BInnspill%5D%20Aksel-artikkel%3A%20${pageTitle}`;

  const href = contact?.github_issues_link?.endsWith("/issues/new")
    ? `${contact.github_issues_link}?${suffix}`
    : contact?.github_issues_link;

  return (
    <VStack gap="space-8">
      {contact && (
        <>
          <Heading level="2" size="small">
            Forvalter
          </Heading>
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
        {href && (
          <ContactCard
            title="Send innspill"
            description="Om du har noen innspill eller tilbakemeldinger kan du sende dem inn på GitHub."
            type="Github"
            href={href}
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
  );
}

export { DesignsystemetPageFooter };
