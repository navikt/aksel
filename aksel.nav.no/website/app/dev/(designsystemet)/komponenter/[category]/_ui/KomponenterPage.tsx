import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { SystemPanel } from "@/app/_ui/system-panel/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetKomponentIntro } from "@/app/dev/(designsystemet)/_ui/Designsystemet.intro";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";

async function KomponenterPage({ slug }: { slug: string }) {
  const [{ data: pageData }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  if (!pageData?._id) {
    notFound();
  }

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
      <div>
        {["beta", "new"].includes(pageData.status?.tag ?? "") && (
          <SystemPanel
            variant={pageData.status?.tag as "beta" | "new"}
            unsafeBeta={pageData.status?.unsafe}
          />
        )}
        <DesignsystemetKomponentIntro data={pageData} />
        <CustomPortableText value={pageData.content as PortableTextBlock[]} />
      </div>
    </DesignsystemetPageLayout>
  );
}

export { KomponenterPage };
