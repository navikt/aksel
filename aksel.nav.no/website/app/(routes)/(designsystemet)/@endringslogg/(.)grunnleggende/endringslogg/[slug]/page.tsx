import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Box } from "@navikt/ds-react";
import { DialogBody, DialogHeader } from "@navikt/ds-react/Dialog";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_WITH_NEIGHBORS_QUERY } from "@/app/_sanity/queries";
import { ChangelogDialog } from "@/app/_ui/changelog-page/ChangelogDialog";
import { ChangelogForList } from "@/app/_ui/changelog-page/ChangelogForList";
import { ChangelogHeader } from "@/app/_ui/changelog-page/ChangelogHeader";
import { capitalizeText } from "@/ui-utils/format-text";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { data: logs } = await sanityFetch({
    query: ENDRINGSLOGG_WITH_NEIGHBORS_QUERY,
    params: { slug },
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
