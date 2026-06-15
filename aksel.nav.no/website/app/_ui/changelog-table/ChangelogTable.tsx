import { format } from "date-fns/format";
import { nb } from "date-fns/locale";
import { Heading } from "@navikt/ds-react";
import type { FetchChangelogsResult } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import styles from "../portable-text/CustomPortableText.module.css";

function ChangelogTable({
  changelogs,
  type = "ds",
}: {
  changelogs: FetchChangelogsResult;
  type?: "ds" | "gp";
}) {
  if (!changelogs.exists) {
    return null;
  }

  const pathPrefix =
    type === "ds" ? "/grunnleggende/endringslogg/" : "/god-praksis/endring/";

  return (
    <div data-block-margin="space-28">
      <Heading
        className={styles.headingElement}
        tabIndex={-1}
        level="2"
        size="large"
        data-level="2"
        id="endringslogg-table"
        data-outside-block
      >
        Endringslogg
      </Heading>
      <WebsiteTable
        th={[{ text: "Dato", width: "10rem" }, { text: "Endringer" }]}
      >
        {changelogs.list.map((changelog) => {
          return (
            <WebsiteTableRow
              key={changelog.endringsdato}
              tr={[
                {
                  text: format(
                    new Date(changelog.endringsdato || 0),
                    "dd.MM.yyyy",
                    { locale: nb },
                  ),
                },
                {
                  text: (
                    <UmamiLink
                      href={`${pathPrefix}${changelog.slug?.current}`}
                      data-color="neutral"
                      lenkegruppe="endringslogg-tabell"
                    >
                      {changelog.heading}
                    </UmamiLink>
                  ),
                },
              ]}
            />
          );
        })}
      </WebsiteTable>
    </div>
  );
}

export { ChangelogTable };
