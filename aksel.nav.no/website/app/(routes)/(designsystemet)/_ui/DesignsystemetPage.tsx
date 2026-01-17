import { PortableTextBlock } from "next-sanity";
import { BodyShort, Box, HStack, Heading, Tag } from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "@/app/(routes)/(designsystemet)/_ui/Designsystemet.eyebrow";
import {
  GRUNNLEGGENDE_BY_SLUG_QUERYResult,
  KOMPONENT_BY_SLUG_QUERYResult,
  MONSTER_MALER_BY_SLUG_QUERYResult,
} from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { formatDateString } from "@/ui-utils/format-date";
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

async function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  const updateDate = formatDateString(data?._updatedAt ?? data?._createdAt);

  const statusTag = getStatusTag(data?.status?.tag);

  const isComponentPage = data?._type === "komponent_artikkel";

  const imageUrl = urlForImage(data?.status?.bilde)?.url();

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
      <HStack gap="space-16" align="center" marginBlock="space-24 space-0">
        {statusTag && (
          <Tag size="xsmall" data-color={statusTag.colorRole}>
            {statusTag.text}
          </Tag>
        )}
        {updateDate && (
          <BodyShort size="small" as="span" textColor="subtle">
            {`Oppdatert ${updateDate}`}
          </BodyShort>
        )}
      </HStack>
      {isComponentPage && <KomponentLinks data={data} />}
      <DesignsystemetThumbnail thumbnailUrl={imageUrl} />
    </Box>
  );
}

export { DesignsystemetPageHeader, DesignsystemetPageLayout };
