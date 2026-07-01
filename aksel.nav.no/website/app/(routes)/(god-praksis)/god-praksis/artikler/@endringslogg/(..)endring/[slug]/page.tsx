import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Box } from "@navikt/ds-react";
import { DialogBody, DialogHeader } from "@navikt/ds-react/Dialog";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
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

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [{ data: pageData }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
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
