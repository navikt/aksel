import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock, defineQuery } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Image as SanityImage } from "sanity";
import {
  BodyShort,
  HGrid,
  HStack,
  Heading,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetPageLayout } from "../../../_ui/DesignsystemetPage";
import styles from "../_ui/Changelog.module.css";
import ChangelogLinkCard from "../_ui/ChangelogLinkCard";

const projection =
  '{heading, "slug": slug.current, endringsdato, endringstype, fremhevet, herobilde, innhold}';
const ENDRINGSLOGG_WITH_NEIGHBORS_QUERY = `
  *[_type == "ds_endringslogg_artikkel" && slug.current == $slug][0]{
    "primary": ${projection},
    "previous": *[_type == "ds_endringslogg_artikkel" && endringsdato < ^.endringsdato] | order(endringsdato desc)[0]${projection},
    "next": *[_type == "ds_endringslogg_artikkel" && endringsdato > ^.endringsdato] | order(endringsdato asc)[0]${projection}
  }
`;

export type ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult = {
  primary: ENDRINGSLOGG_QUERYResult[number];
  previous: ENDRINGSLOGG_QUERYResult[number];
  next: ENDRINGSLOGG_QUERYResult[number];
};

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: defineQuery(`
  *[_type == "ds_endringslogg_artikkel" && defined(slug.current)].slug.current
`),
    stega: false,
    perspective: "published",
  });
  return slugs.map((slug: string) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function (props: Props) {
  const { slug } = await props.params;

  const { data: logs }: { data: ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult } =
    await sanityFetch<typeof ENDRINGSLOGG_WITH_NEIGHBORS_QUERY>({
      query: defineQuery(ENDRINGSLOGG_WITH_NEIGHBORS_QUERY),
      params: { slug: `${slug}` },
    });

  if (!logs?.primary) {
    notFound();
  }

  const toc = logs?.primary?.innhold?.reduce(
    (filtered, block) => {
      if (block._type === "block" && block.style === "h2") {
        filtered.push({
          id: block._key,
          title: block.children?.[0].text || "",
        });
      }
      return filtered;
    },
    [] as { id: string; title: string }[],
  );

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack marginBlock="space-0 space-28">
        <BodyShort
          size="medium"
          className={
            logs.primary.fremhevet
              ? styles.kategoriFremhevet
              : styles.kategoriInArticle
          }
        >
          {logs.primary.endringstype}
        </BodyShort>
        <Heading
          size="xlarge"
          level="1"
          spacing
          className={logs.primary.fremhevet ? styles.headingFremhevet : ""}
        >
          {logs.primary.heading}
        </Heading>
        <HStack gap="space-16" marginBlock="space-0 space-28">
          <BodyShort
            size="small"
            className={logs.primary.fremhevet ? styles.dateFremhevet : ""}
          >
            {format(new Date(logs.primary.endringsdato || ""), "d. MMMM yyy", {
              locale: nb,
            })}
          </BodyShort>
          {logs.primary.fremhevet && (
            <Tag size="xsmall" variant="neutral-filled" className={styles.tag}>
              Fremhevet
            </Tag>
          )}
        </HStack>
        {logs.primary.fremhevet && logs.primary.herobilde?.asset && (
          <Image
            data-block-margin="space-28"
            className={styles.herobilde}
            alt={logs.primary.herobilde.alt ? logs.primary.herobilde.alt : ""}
            loading="lazy"
            decoding="async"
            src={
              urlForImage(logs.primary.herobilde as SanityImage)
                ?.auto("format")
                .url() || ""
            }
            width={1200}
            height={630}
          />
        )}
        <CustomPortableText
          value={logs.primary.innhold as PortableTextBlock[]}
        />
      </VStack>
      <HGrid
        marginBlock="space-48 space-0"
        gap="space-24"
        columns={{ xs: 1, md: 2 }}
      >
        {logs.previous && (
          <ChangelogLinkCard logEntry={logs.previous} label="Forrige endring" />
        )}
        {logs.next && (
          <ChangelogLinkCard logEntry={logs.next} label="Neste endring" />
        )}
      </HGrid>
      <TableOfContents
        feedback={{
          name: "Endringslogg",
          text: "Innspill til siden",
        }}
        showChangelogLink={true}
        toc={toc || []}
      />
    </DesignsystemetPageLayout>
  );
}
