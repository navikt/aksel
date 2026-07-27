import type { PortableTextBlock } from "next-sanity";
import { Box, Heading } from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "@/app/(routes)/(designsystemet)/_ui/Designsystemet.eyebrow";
import type {
  GRUNNLEGGENDE_BY_SLUG_QUERY_RESULT,
  KOMPONENT_BY_SLUG_QUERY_RESULT,
  MONSTER_MALER_BY_SLUG_QUERY_RESULT,
} from "@/app/_sanity/query-types";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import styles from "./Designsystemet.module.css";

type DesignsystemetPageLayoutT = {
  children: React.ReactNode;
  /**
   * @default "without-toc"
   */
  layout?: "with-toc" | "without-toc";
};

function DesignsystemetPageLayout({
  children,
  layout = "without-toc",
}: DesignsystemetPageLayoutT) {
  return (
    <main
      id="hovedinnhold"
      className={styles.pageLayoutMain}
      data-layout={layout}
    >
      {children}
    </main>
  );
}

type DesignsystemetPageT = {
  data:
    | KOMPONENT_BY_SLUG_QUERY_RESULT
    | GRUNNLEGGENDE_BY_SLUG_QUERY_RESULT
    | MONSTER_MALER_BY_SLUG_QUERY_RESULT;
};

async function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  const statusTag = getStatusTag(data?.status?.tag);

  const isComponentPage = data?._type === "komponent_artikkel";

  return (
    <Box marginBlock="space-0 space-28" data-color={statusTag?.colorRole}>
      <DesignsystemetEyebrow type={data?._type} />
      <Box marginBlock="space-0 space-8" asChild>
        <Heading
          level="1"
          size="xlarge"
          data-aksel-heading-color
          data-text-prose
        >
          {data?.heading}
        </Heading>
      </Box>
      {isComponentPage && (
        <CustomPortableText
          value={data?.intro?.body as PortableTextBlock[]}
          typoConfig={{
            type: "long",
            size: "large",
          }}
        />
      )}
    </Box>
  );
}

export { DesignsystemetPageHeader, DesignsystemetPageLayout };
