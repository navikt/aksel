import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
import { sanityFetch } from "@/app/_sanity/live";
import {
  MONSTER_MALER_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { ChangelogTable } from "@/app/_ui/changelog-table/ChangelogTable";
import { fetchChangelogs } from "@/app/_ui/changelog-table/ChangelogTable.fetch";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";

async function MonsterMalerPage({ slug }: { slug: string }) {
  const [{ data: pageData }, toc] = await Promise.all([
    sanityFetch({
      query: MONSTER_MALER_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }).then((res) => res.data || []),
  ]);

  if (!pageData?._id) {
    notFound();
  }

  const changelogs = await fetchChangelogs(pageData._id, "ds");

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
      <CustomPortableText
        value={pageData.content as PortableTextBlock[]}
        data-block-margin="space-28"
      />
      <ChangelogTable changelogs={changelogs} />
    </DesignsystemetPageLayout>
  );
}

export { MonsterMalerPage };
