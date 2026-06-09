import { format } from "date-fns/format";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Link } from "@navikt/ds-react";
import { DesignsystemetKomponentIntro } from "@/app/(routes)/(designsystemet)/_ui/Designsystemet.intro";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { SystemPanel } from "@/app/_ui/system-panel/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { PreviewNote } from "./PreviewNote";

async function KomponenterPage({ slug }: { slug: string }) {
  const [{ data: pageData }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  if (!pageData?._id) {
    notFound();
  }

  const renderPreviewNote =
    pageData.status?.tag === "preview" && pageData.status?.preview_note;

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <DesignsystemetPageHeader data={pageData} />
      <TableOfContents
        feedback={{
          name: pageData.heading,
          text: "Send innspill",
        }}
        toc={toc}
      />
      <div>
        {["beta", "new"].includes(pageData.status?.tag ?? "") && (
          <SystemPanel
            variant={pageData.status?.tag as "beta" | "new"}
            unsafeBeta={pageData.status?.unsafe}
          />
        )}

        {renderPreviewNote && (
          <PreviewNote
            content={pageData.status?.preview_note as PortableTextBlock[]}
          />
        )}
        <DesignsystemetKomponentIntro data={pageData} />
        <CustomPortableText value={pageData.content as PortableTextBlock[]} />
        <ChangelogTable changelogs={pageData.changelog} />
      </div>
    </DesignsystemetPageLayout>
  );
}

function ChangelogTable({
  changelogs,
}: {
  changelogs: NonNullable<KOMPONENT_BY_SLUG_QUERY_RESULT>["changelog"];
}) {
  if (!changelogs || changelogs.length === 0) {
    return null;
  }

  return (
    <div>
      <WebsiteTable th={[{ text: "Dato" }, { text: "Endringer" }]}>
        {changelogs.map((changelog) => {
          return (
            <WebsiteTableRow
              key={changelog.endringsdato}
              tr={[
                {
                  text: format(
                    new Date(changelog.endringsdato || 0),
                    "dd.MM.yyy",
                    { locale: nb },
                  ),
                },
                {
                  text: (
                    <Link href={changelog.slug?.current} data-color="neutral">
                      {changelog.heading}
                    </Link>
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

export { KomponenterPage };
