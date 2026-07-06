import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
import { DesignsystemetPageFooter } from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPageFooter";
import { sanityFetch } from "@/app/_sanity/live";
import {
  MONSTER_MALER_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
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
      <CustomPortableText
        value={pageData.content as PortableTextBlock[]}
        data-block-margin="space-28"
      />

      <DesignsystemetPageFooter
        pageId={pageData._id}
        updateDateString={pageData._updatedAt ?? pageData._createdAt}
      />
    </DesignsystemetPageLayout>
  );
}

export { MonsterMalerPage };
