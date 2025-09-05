import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Heading } from "@navikt/ds-react";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
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

async function MonsterMalerPage({ slug }: { slug: string }) {
  const [{ data: pageData }, toc] = await Promise.all([
    sanityFetch({
      query: MONSTER_MALER_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }).then((res) => res.data || []),
  ]);

  if (!pageData) {
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
        toc={
          metadata?.changelog
            ? [...toc, { id: "changelog", title: "Endringer" }]
            : toc
        }
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

export { MonsterMalerPage };
