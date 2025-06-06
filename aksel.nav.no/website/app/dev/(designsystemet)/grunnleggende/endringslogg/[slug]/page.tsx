import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock, defineQuery } from "next-sanity";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { BodyShort, HStack, Heading, Tag, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  ENDRINGSLOGG_QUERYResult,
  TOC_BY_SLUG_QUERYResult,
} from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetPageLayout } from "../../../_ui/DesignsystemetPage";
import styles from "../_ui/Changelog.module.css";

const ENDRINGSLOGG_QUERY = defineQuery(
  `*[_type == "ds_endringslogg_artikkel" && slug.current == $slug]{heading, "slug": slug.current, endringsdato, endringstype, fremhevet, herobilde, innhold}`,
);
const TOC_BY_SLUG_QUERY = defineQuery(
  `*[_type == "ds_endringslogg_artikkel" && slug.current == $slug][0].innhold[style match 'h2']{
  "id": _key,
  "title": pt::text(@)
}`,
);

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function (props: Props) {
  const { slug } = await props.params;

  const [{ data: logEntries }, { data: toc }]: [
    { data: ENDRINGSLOGG_QUERYResult },
    { data: TOC_BY_SLUG_QUERYResult },
  ] = await Promise.all([
    sanityFetch<typeof ENDRINGSLOGG_QUERY>({
      query: ENDRINGSLOGG_QUERY,
      params: { slug: `${slug}` },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  const logEntry = logEntries[0];

  // TODO: [endringslogg] Generate TOC from logEntry.innhold or get from Sanity with TOC_BY_SLUG_QUERY ???
  // const tocByReduce = logEntry.innhold?.reduce(
  //   (filtered, block) => {
  //     console.dir(block);
  //     if (block._type === "block" && block.style === "h2") {
  //       filtered.push({
  //         id: block._key,
  //         title: block.children?.[0].text || "",
  //       });
  //     }
  //     return filtered;
  //   },
  //   [] as { id: string; title: string }[],
  // );

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack>
        <BodyShort
          size="medium"
          className={
            logEntry.fremhevet
              ? styles.kategoriFremhevet
              : styles.kategoriInArticle
          }
        >
          {logEntry.endringstype}
        </BodyShort>
        <Heading
          size="xlarge"
          level="1"
          spacing
          className={logEntry.fremhevet ? styles.headingFremhevet : ""}
        >
          {logEntry.heading}
        </Heading>
        <HStack gap="space-16" marginBlock="space-0 space-28">
          <BodyShort
            size="small"
            className={logEntry.fremhevet ? styles.dateFremhevet : ""}
          >
            {format(new Date(logEntry.endringsdato || ""), "d. MMMM yyy", {
              locale: nb,
            })}
          </BodyShort>
          {logEntry.fremhevet && (
            <Tag size="xsmall" variant="neutral-filled" className={styles.tag}>
              Fremhevet
            </Tag>
          )}
        </HStack>
        {logEntry.fremhevet && logEntry.herobilde?.asset && (
          <Image
            data-block-margin="space-28"
            className={styles.herobilde}
            alt={logEntry.herobilde.alt ? logEntry.herobilde.alt : ""}
            loading="lazy"
            decoding="async"
            src={
              urlForImage(logEntry.herobilde as SanityImage)
                ?.auto("format")
                .url() || ""
            }
            width={1200}
            height={630}
          />
        )}
        <CustomPortableText value={logEntry.innhold as PortableTextBlock[]} />
      </VStack>

      <TableOfContents
        feedback={{
          name: "Endringslogg",
          text: "Innspill til siden",
        }}
        showChangelogLink={true}
        // TODO: [endringslogg] Generate TOC from logEntry.innhold or get from Sanity with TOC_BY_SLUG_QUERY ???
        toc={toc}
        // toc={tocByReduce || []}
      />
    </DesignsystemetPageLayout>
  );
}
