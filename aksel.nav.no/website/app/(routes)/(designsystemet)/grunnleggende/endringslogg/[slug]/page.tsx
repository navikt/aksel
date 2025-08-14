import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import {
  BodyShort,
  BoxNew,
  HGrid,
  HStack,
  Heading,
  Tag,
} from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  ENDRINGSLOGG_METADATA_BY_SLUG_QUERY,
  ENDRINGSLOGG_WITH_NEIGHBORS_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForImage, urlForOpenGraphImage } from "@/app/_sanity/utils";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { capitalizeText } from "@/ui-utils/format-text";
import { DesignsystemetPageLayout } from "../../../_ui/DesignsystemetPage";
import styles from "../_ui/Changelog.module.css";
import ChangelogLinkCard from "../_ui/ChangelogLinkCard";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: ENDRINGSLOGG_METADATA_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  return {
    title: `${pageData?.heading} - Endringslogg`,
    keywords: pageData?.endringstype,
    description: pageData?.seo?.meta,
    openGraph: {
      type: "article",
      publishedTime: pageData?.endringsdato || undefined,
      images:
        urlForOpenGraphImage(pageData?.seo?.image) ||
        urlForOpenGraphImage(pageData?.herobilde) ||
        "/images/og/endringslogg/OG-endringslogg.png",
    },
  };
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "ds_endringslogg_artikkel" },
    stega: false,
    perspective: "published",
  });
  return slugs.filter((slug) => slug !== null).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function (props: Props) {
  const { slug } = await props.params;

  const { data: logs } = await sanityFetch({
    query: ENDRINGSLOGG_WITH_NEIGHBORS_QUERY,
    params: { slug },
  });

  if (!logs?.primary) {
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

  const { fremhevet, endringstype, heading, endringsdato, herobilde, content } =
    logs.primary;

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <div>
        <BodyShort
          size="medium"
          textColor="subtle"
          data-color={fremhevet ? "aksel-brand-pink" : "brand-blue"}
        >
          {capitalizeText(endringstype || "")}
        </BodyShort>
        <Heading
          size="xlarge"
          level="1"
          spacing
          data-color={fremhevet ? "aksel-brand-pink" : "brand-blue"}
        >
          {heading}
        </Heading>
        <HStack gap="space-16" marginBlock="space-0 space-28">
          <BodyShort
            size="small"
            textColor="subtle"
            data-color={fremhevet ? "aksel-brand-pink" : "brand-blue"}
          >
            {format(new Date(endringsdato || ""), "d. MMMM yyy", {
              locale: nb,
            })}
          </BodyShort>
          {fremhevet && (
            <Tag
              size="xsmall"
              variant="neutral-filled"
              data-color="aksel-brand-pink"
            >
              Fremhevet
            </Tag>
          )}
        </HStack>
      </div>

      <TableOfContents
        feedback={{
          name: "Endringslogg",
          text: "Innspill til siden",
        }}
        toc={toc || []}
      />

      <BoxNew marginBlock="space-0 space-24">
        {fremhevet && herobilde?.asset && (
          <Image
            className={styles.herobilde}
            alt={herobilde.alt ? herobilde.alt : ""}
            loading="lazy"
            decoding="async"
            src={urlForImage(herobilde)?.auto("format").url() || ""}
            width={1200}
            height={630}
          />
        )}
        <CustomPortableText
          value={content as PortableTextBlock[]}
          data-color={fremhevet ? "aksel-brand-pink" : "brand-blue"}
        />
      </BoxNew>

      <HGrid
        marginBlock="space-28 0"
        gap="space-48 space-24"
        columns={{ xs: 1, md: 2 }}
      >
        {logs.previous && (
          <ChangelogLinkCard logEntry={logs.previous} label="Forrige endring" />
        )}
        {logs.next && (
          <ChangelogLinkCard logEntry={logs.next} label="Neste endring" />
        )}
      </HGrid>
    </DesignsystemetPageLayout>
  );
}
