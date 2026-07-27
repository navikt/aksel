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
import { ENDRINGSLOGG_WITH_NEIGHBORS_QUERY } from "@/app/_sanity/queries";
import { ChangelogDialog } from "@/app/_ui/changelog-page/ChangelogDialog";
import { ChangelogForList } from "@/app/_ui/changelog-page/ChangelogForList";
import { ChangelogHeader } from "@/app/_ui/changelog-page/ChangelogHeader";
import { capitalizeText } from "@/ui-utils/format-text";

type Props = {
  params: Promise<{ slug: string }>;
};

// Intercepting route: renders as a dialog during client navigation and has no
// stable pathname of its own, so the shared layout `usePathname()` can't be
// prerendered. Opt out of prerender validation; it renders dynamically.
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

  const { data: logs } = await sanityFetch({
    query: ENDRINGSLOGG_WITH_NEIGHBORS_QUERY,
    params: { slug },
    perspective,
    stega,
  });

  if (!logs?.primary.heading || !logs.primary.endringsdato) {
    notFound();
  }

  const toc: { id: string; title: string }[] = [];
  logs.primary.content?.forEach((block) => {
    if (block._type === "block" && block.style === "h2") {
      toc.push({
        id: block._key,
        title: block.children?.[0].text || "",
      });
    }
  });

  const { endringstype, heading, endringsdato, content } = logs.primary;

  const changelogFor =
    logs.artikler?.filter((article) => !!article.slug && !!article.heading) ??
    [];

  return (
    <ChangelogDialog>
      <DialogHeader>
        <ChangelogHeader
          heading={heading}
          endringsdato={endringsdato}
          type={capitalizeText(endringstype || "")}
        />
      </DialogHeader>
      <DialogBody>
        <article>
          <ChangelogForList changelogFor={changelogFor} />
          <Box marginBlock="space-48">
            <CustomPortableText value={content as PortableTextBlock[]} />
          </Box>
        </article>
      </DialogBody>
    </ChangelogDialog>
  );
}
