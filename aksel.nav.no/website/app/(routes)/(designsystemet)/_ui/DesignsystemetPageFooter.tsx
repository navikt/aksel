import { BodyShort } from "@navikt/ds-react";
import { ChangelogTable } from "@/app/_ui/changelog-table/ChangelogTable";
import { fetchChangelogs } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
import { formatDateString } from "@/ui-utils/format-date";

async function DesignsystemetPageFooter({
  pageId,
  updateDateString,
}: {
  pageId: string;
  updateDateString: string;
}) {
  const updateDate = formatDateString(updateDateString);
  const changelogs = await fetchChangelogs(pageId, "ds");

  return (
    <div data-block-margin="space-28">
      <ChangelogTable changelogs={changelogs} />
      {updateDate && (
        <BodyShort size="small" as="span" textColor="subtle">
          {`Artikkel oppdatert ${updateDate}`}
        </BodyShort>
      )}
    </div>
  );
}

export { DesignsystemetPageFooter };
