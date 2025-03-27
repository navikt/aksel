import { PortableTextBlock } from "next-sanity";
import { Detail, HStack, Heading, Tag } from "@navikt/ds-react";
import {
  GRUNNLEGGENDE_BY_SLUG_QUERYResult,
  KOMPONENT_BY_SLUG_QUERYResult,
} from "@/app/_sanity/query-types";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { getStatusTag } from "@/app/_ui/theme-config";
import { dateStr } from "@/utils";
import styles from "./Designsystemet.module.css";
import { DesignsystemetThumbnail } from "./Designsystemet.thumbnail";
import { KomponentLinks } from "./DesignsystemetPage.parts";

type DesignsystemetPageLayoutT = {
  children: React.ReactNode;
  layout?: "with-toc";
};

function DesignsystemetPageLayout({
  children,
  layout,
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
  data: KOMPONENT_BY_SLUG_QUERYResult | GRUNNLEGGENDE_BY_SLUG_QUERYResult;
};

async function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  /* TODO: refactor dateStr to appdir */
  const publishDate = await dateStr(data?._updatedAt ?? data?._createdAt ?? "");

  const statusTag = getStatusTag(data?.status?.tag);

  const isComponentPage = data?._type === "komponent_artikkel";

  return (
    <div>
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
    </div>
  );
}

export { DesignsystemetPageHeader, DesignsystemetPageLayout };
