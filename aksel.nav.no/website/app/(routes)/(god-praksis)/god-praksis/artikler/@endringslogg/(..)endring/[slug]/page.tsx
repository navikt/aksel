import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Box } from "@navikt/ds-react";
import { DialogBody, DialogHeader } from "@navikt/ds-react/Dialog";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/app/_sanity/live";
import {
  GP_CHANGELOGS_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { ChangelogDialog } from "@/app/_ui/changelog-page/ChangelogDialog";
import { ChangelogForList } from "@/app/_ui/changelog-page/ChangelogForList";
import { ChangelogHeader } from "@/app/_ui/changelog-page/ChangelogHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

// Intercepting route: renders as a dialog during client navigation and has no
// stable pathname of its own, so the shared Header/Footer `usePathname()` can't
// be prerendered. Opt out of prerender validation; it renders dynamically.
export const unstable_instant = false;

export default async function Page({ params }: Props) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense fallback={null}>
        <DynamicPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return <CachedPage slug={slug} perspective="published" stega={false} />;
}

async function DynamicPage({ params }: Props) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return <CachedPage slug={slug} perspective={perspective} stega={stega} />;
}

async function CachedPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";

  const [{ data: pageData }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
    }),
  ]);

  if (!pageData?.heading || !pageData._id || !pageData.endringsdato) {
    notFound();
  }

  const changelogFor =
    pageData.artikler?.filter(
      (article) => !!article.slug && !!article.heading,
    ) ?? [];

  return (
    <ChangelogDialog>
      <DialogHeader>
        <ChangelogHeader
          heading={pageData.heading}
          endringsdato={pageData.endringsdato}
          type="God praksis"
        />
      </DialogHeader>
      <DialogBody>
        <article>
          <ChangelogForList changelogFor={changelogFor} />
          <Box marginBlock="space-48">
            <CustomPortableText
              value={(pageData.content ?? []) as PortableTextBlock[]}
            />
          </Box>
        </article>
      </DialogBody>
    </ChangelogDialog>
  );
}
