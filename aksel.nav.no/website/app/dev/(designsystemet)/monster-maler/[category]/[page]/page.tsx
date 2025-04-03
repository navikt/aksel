import { Metadata, ResolvingMetadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { Heading } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  METADATA_BY_SLUG_QUERY,
  MONSTER_MALER_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import styles from "@/app/_ui/portable-text/CustomPortableText.module.css";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";
import {
  getStaticParamsSlugs,
  parseDesignsystemSlug,
} from "@/app/dev/(designsystemet)/slug";

type Props = {
  params: Promise<{ category: string; page: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, page } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(category, page, "monster-maler") },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(pageData?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: pageData?.heading,
    description: pageData?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

export async function generateStaticParams() {
  return await getStaticParamsSlugs("templates_artikkel");
}

export default async function Page({ params }: Props) {
  const { category, page } = await params;

  const parsedSlug = parseDesignsystemSlug(category, page, "monster-maler");

  const [{ data: pageData }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: MONSTER_MALER_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  if (!pageData?._id) {
    notFound();
  }

  const metadata = pageData.content?.find((x) => x._type === "kode_eksempler")
    ?.dir?.metadata;

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
      {metadata?.changelog && (
        <div>
          <Heading
            className={styles.headingElement}
            tabIndex={-1}
            id="changelog"
            level="2"
            size="large"
            data-level="2"
          >
            Endringer
          </Heading>
          <WebsiteTable
            th={[{ text: "Dato" }, { text: "Versjon" }, { text: "Endringer" }]}
          >
            {metadata.changelog
              .sort((a, b) => (a.version ?? 0) - (b.version ?? 0))
              .map((log) => (
                <WebsiteTableRow
                  key={log.version}
                  tr={[
                    { text: log.date },
                    { text: log.version },
                    { text: log.description },
                  ]}
                />
              ))}
          </WebsiteTable>
        </div>
      )}
    </DesignsystemetPageLayout>
  );
}
