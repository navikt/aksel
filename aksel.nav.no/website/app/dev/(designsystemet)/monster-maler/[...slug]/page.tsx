import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Heading } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  MONSTER_MALER_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
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
} from "../../_ui/DesignsystemetPage";
import { getStaticParamsSlugs, parseDesignsystemSlug } from "../../slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return await getStaticParamsSlugs("templates_artikkel");
}

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "monster-maler");

  const [{ data: page }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: MONSTER_MALER_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  if (!page?._id) {
    notFound();
  }

  const metadata = page.content?.find((x) => x._type === "kode_eksempler")?.dir
    ?.metadata;

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <DesignsystemetPageHeader data={page} />
      <TableOfContents
        feedback={{
          name: page.heading,
          text: "Send innspill",
        }}
        toc={toc}
      />
      <CustomPortableText
        value={page.content as PortableTextBlock[]}
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
