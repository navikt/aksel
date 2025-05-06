import type { Image } from "sanity";
import {
  Bleed,
  BodyLong,
  Box,
  HStack,
  Heading,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { ImageAsThemedSvg } from "@/app/_ui/image-as-svg/ImageAsSvg";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import {
  DesignsystemetEyebrow,
  DesignsystemetEyebrowProps,
} from "@/app/dev/(designsystemet)/_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import styles from "./DesignsystemetOverview.module.css";

type DesignsystemetOverviewPageProps = {
  title: string;
  ingress?: string;
  links: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult;
} & Pick<DesignsystemetEyebrowProps, "type">;

function DesignsystemetOverviewPage({
  title,
  ingress,
  links,
  type,
}: DesignsystemetOverviewPageProps) {
  const list = sortDesignsystemetOverviewList(links);

  return (
    <DesignsystemetPageLayout>
      <div>
        <DesignsystemetEyebrow type={type} />
        <Heading level="1" size="xlarge" data-aksel-heading-color>
          {title}
        </Heading>
        {ingress && (
          <Box marginBlock="space-8 space-0" asChild>
            <BodyLong size="large">
              <MarkdownText>{ingress}</MarkdownText>
            </BodyLong>
          </Box>
        )}
      </div>

      <ul className={styles.overviewGrid}>
        {list.map((component) => (
          <li key={component.heading} className={styles.overviewLi}>
            <DesignsystemetOverviewCard page={component} />
          </li>
        ))}
      </ul>
    </DesignsystemetPageLayout>
  );
}

function DesignsystemetOverviewCard({
  page,
}: {
  page: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult[number];
}) {
  const imageUrl = urlForImage(page.status?.bilde as Image)?.url();

  const statusTag = getStatusTag(page.status?.tag);
  const statusTagWithoutStable = getStatusTag(page.status?.tag, true);

  return (
    <LinkCard data-color-role={statusTag?.colorRole} autoLayout={false}>
      <VStack gap="space-16">
        <Bleed marginInline="space-20" marginBlock="space-16 0">
          <span className={styles.overviewImageWrapper}>
            <ImageAsThemedSvg url={imageUrl} size={200} />
          </span>
        </Bleed>

        <LinkCardTitle as="h2">
          <LinkCardAnchor href={`/${page?.slug}`}>
            <HStack as="span" gap="space-8" align="center">
              <span>{page?.heading} </span>
              {statusTagWithoutStable && (
                <Tag
                  size="small"
                  variant="success"
                  data-color-role={statusTag?.colorRole}
                >
                  {/* TODO: Remove underline from tag */}
                  {statusTagWithoutStable.text}
                </Tag>
              )}
            </HStack>
          </LinkCardAnchor>
        </LinkCardTitle>
      </VStack>
    </LinkCard>
  );
}

function sortDesignsystemetOverviewList(
  list: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult,
) {
  return list
    .filter(
      (
        page,
      ): page is NonNullable<typeof page> & { heading: string; slug: string } =>
        Boolean(page?.heading && page.slug),
    )
    .toSorted((a, b) => {
      // Handle deprecated status
      if (a?.status?.tag === "deprecated" || b?.status?.tag === "deprecated") {
        if (
          a?.status?.tag === "deprecated" &&
          b?.status?.tag === "deprecated"
        ) {
          return 0;
        }
        return a?.status?.tag === "deprecated" ? 1 : -1;
      }

      // Handle sidebar index
      if (
        typeof a.sidebarindex === "number" ||
        typeof b.sidebarindex === "number"
      ) {
        if (
          typeof a.sidebarindex === "number" &&
          typeof b.sidebarindex === "number"
        ) {
          return a.sidebarindex - b.sidebarindex;
        }
        return a.sidebarindex !== null ? -1 : 1;
      }

      // Fallback to alphabetical sorting by heading
      return a?.heading?.localeCompare(b?.heading ?? "");
    });
}

export {
  DesignsystemetOverviewCard,
  DesignsystemetOverviewPage,
  sortDesignsystemetOverviewList,
};
