import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
import { DesignsystemetPageFooter } from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPageFooter";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/app/_sanity/live";
import {
  MONSTER_MALER_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";

async function MonsterMalerPage({ slug }: { slug: string }) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return (
      <CachedMonsterMalerPage
        slug={slug}
        perspective="published"
        stega={false}
      />
    );
  }

  return (
    <Suspense fallback={null}>
      <DynamicMonsterMalerPage slug={slug} />
    </Suspense>
  );
}

async function DynamicMonsterMalerPage({ slug }: { slug: string }) {
  const { perspective, stega } = await getDynamicFetchOptions();
  return (
    <CachedMonsterMalerPage
      slug={slug}
      perspective={perspective}
      stega={stega}
    />
  );
}

async function CachedMonsterMalerPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";

  const [{ data: pageData }, toc] = await Promise.all([
    sanityFetch({
      query: MONSTER_MALER_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
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
          text: "GitHub issues",
          href: pageData.contact?.github_issues_link,
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
        contact={pageData.contact}
      />
    </DesignsystemetPageLayout>
  );
}

export { MonsterMalerPage };
