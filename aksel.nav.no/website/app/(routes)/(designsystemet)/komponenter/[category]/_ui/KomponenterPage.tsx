import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
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
import { ChangelogTable } from "@/app/_ui/changelog-table/ChangelogTable";
import { fetchChangelogs } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { SystemPanel } from "@/app/_ui/system-panel/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
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

  const changelogs = await fetchChangelogs(pageData._id, "ds");

  const renderPreviewNote =
    pageData.status?.tag === "preview" && pageData.status?.preview_note;

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <DesignsystemetPageHeader
        data={pageData}
        linkToChangelogs={changelogs.exists}
      />
      <TableOfContents
        feedback={{
          name: pageData.heading,
          text: "Send innspill",
        }}
        toc={toc}
        linkToChangelogs={changelogs.exists}
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
        <ChangelogTable changelogs={changelogs} />
      </div>
    </DesignsystemetPageLayout>
  );
}

export { KomponenterPage };
