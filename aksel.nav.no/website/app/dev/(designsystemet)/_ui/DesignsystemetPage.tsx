import { PortableTextBlock } from "next-sanity";
import { BodyShort, Box, Detail, HStack, Heading, Tag } from "@navikt/ds-react";
import {
  GRUNNLEGGENDE_BY_SLUG_QUERYResult,
  KOMPONENT_BY_SLUG_QUERYResult,
  MONSTER_MALER_BY_SLUG_QUERYResult,
} from "@/app/_sanity/query-types";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { dateStr } from "@/utils";
import styles from "./Designsystemet.module.css";
import { DesignsystemetThumbnail } from "./Designsystemet.thumbnail";
import { KomponentLinks } from "./DesignsystemetPage.parts";

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
    | KOMPONENT_BY_SLUG_QUERYResult
    | GRUNNLEGGENDE_BY_SLUG_QUERYResult
    | MONSTER_MALER_BY_SLUG_QUERYResult;
};

const eyebrowMap = {
  komponent_artikkel: "Komponenter",
  ds_artikkel: "Grunnleggende",
  templates_artikkel: "Maler",
};

async function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  /* TODO: refactor dateStr to appdir */
  const publishDate = await dateStr(data?._updatedAt ?? data?._createdAt ?? "");

  const statusTag = getStatusTag(data?.status?.tag);

  const isComponentPage = data?._type === "komponent_artikkel";

  return (
    <Box marginBlock="space-0 space-28">
      {data?._type && (
        <BodyShort size="small" className={styles.pageHeaderEyebrow}>
          {eyebrowMap[data?._type]}
        </BodyShort>
      )}
      <Heading level="1" size="xlarge" className={styles.pageHeaderHeading}>
        {data?.heading}
      </Heading>
      {isComponentPage && (
        <CustomPortableText
          value={data?.intro?.body as PortableTextBlock[]}
          typoConfig={{
            type: "short",
            size: "large",
          }}
        />
      )}
      <HStack gap="space-16" align="center" marginBlock="space-24 0">
        {statusTag && (
          <Tag
            variant="info"
            size="xsmall"
            data-color-role={statusTag.colorRole}
          >
            {statusTag.text}
          </Tag>
        )}
        {publishDate && (
          <Detail as="span" textColor="subtle">
            {publishDate}
          </Detail>
        )}
      </HStack>
      {isComponentPage && <KomponentLinks data={data} />}

      <DesignsystemetThumbnail />
    </Box>
  );
}

export { DesignsystemetPageHeader, DesignsystemetPageLayout };
