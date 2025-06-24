import Link from "next/link";
import type { Image } from "sanity";
import { BodyLong, Box, HGrid, Heading, LinkCard, Tag } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardImage,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import {
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult,
  DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERYResult,
} from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { ImageAsThemedSvg } from "@/app/_ui/image-as-svg/ImageAsSvg";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { DesignsystemetEyebrow } from "@/app/dev/(designsystemet)/_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";
import styles from "./DesignsystemetOverview.module.css";

type DesignsystemetOverviewPageProps = {
  title: string;
  ingress?: string;
  links: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult;
};

function DesignsystemetOverviewPage({
  title,
  ingress,
  links,
}: DesignsystemetOverviewPageProps) {
  const list = sortDesignsystemetOverviewList(links);

  return (
    <DesignsystemetPageLayout>
      <div>
        <DesignsystemetEyebrow text="Oversikt" />
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

      <HGrid
        as="ul"
        columns="repeat(auto-fill, minmax(min(14rem, 100%), 1fr))"
        gap="space-24"
        marginBlock="space-48"
      >
        {list.map((component) => (
          <li key={component.heading} className={styles.overviewLi}>
            <DesignsystemetOverviewCard page={component} />
          </li>
        ))}
      </HGrid>
    </DesignsystemetPageLayout>
  );
}

function DesignsystemetOverviewCard({
  page,
}: {
  page:
    | DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERYResult[number]
    | DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERYResult[number];
}) {
  const imageUrl = urlForImage(page.status?.bilde as Image)?.url();

  const statusTag = getStatusTag(page.status?.tag);
  const statusTagWithoutStable = getStatusTag(page.status?.tag, true);

  return (
    <LinkCard data-color={statusTag?.colorRole}>
      <LinkCardImage
        aspectRatio="16/10"
        className={styles.overviewImageWrapper}
      >
        <ImageAsThemedSvg url={imageUrl} size={200} />
        {statusTagWithoutStable && (
          <Box asChild position="absolute" bottom="space-8" left="space-8">
            <Tag
              size="small"
              variant="alt1-filled"
              data-color={statusTag?.colorRole}
            >
              {statusTagWithoutStable.text}
            </Tag>
          </Box>
        )}
      </LinkCardImage>

      <LinkCardTitle>
        <LinkCardAnchor asChild>
          <Link href={`/${page?.slug}`}>{page?.heading}</Link>
        </LinkCardAnchor>
      </LinkCardTitle>
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
