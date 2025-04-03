import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, HStack, Heading, Tag } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { KOMPONENTOVERSIKT_QUERY } from "@/app/_sanity/queries";
import { KOMPONENTOVERSIKT_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import pagestyles from "../_ui/Designsystemet.module.css";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import styles from "../_ui/Overview.module.css";
import { OverviewPageToggle } from "../_ui/OverviewPageToggle";

/* export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: page } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(slug, "komponenter") },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: page?.heading,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
} */

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { data: components } = await sanityFetch({
    query: KOMPONENTOVERSIKT_QUERY,
  });

  if (!components || components.length === 0) {
    notFound();
  }

  let { sort = "grid" } = await searchParams;

  if (typeof sort !== "string") {
    sort = "grid";
  }

  const list = sortOverview(components);

  return (
    <DesignsystemetPageLayout>
      <div>
        <Heading
          level="1"
          size="xlarge"
          className={pagestyles.pageHeaderHeading}
        >
          Komponenter
        </Heading>
        <BodyShort size="large">
          Dette er generiske komponenter som passer til det meste. Både åpne
          sider og interne ekspertsystemer.
        </BodyShort>
        <HStack marginBlock="space-24 space-48" justify="end">
          <OverviewPageToggle value={sort} />
        </HStack>
      </div>

      {sort === "grid" ? (
        <ul className={styles.overviewGrid}>
          {list.map((component) => (
            <li key={component.heading} className={styles.overviewLi}>
              <OverviewCard page={component} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.overviewList}>
          {list.map((component) => (
            <li key={component.heading} className={styles.overviewLi}>
              <OverviewInlineCard page={component} />
            </li>
          ))}
        </ul>
      )}
    </DesignsystemetPageLayout>
  );
}

function OverviewInlineCard({
  page,
}: {
  page: KOMPONENTOVERSIKT_QUERYResult[number];
}) {
  const imageUrl = urlForImage(page.status?.bilde as Image)?.url();

  /* TODO: Add fallback to svg or something */
  if (!imageUrl) {
    return null;
  }

  const statusTag = getStatusTag(page.status?.tag);
  const statusTagWithoutStable = getStatusTag(page.status?.tag, true);

  return (
    <Link
      href={`/${page?.slug}`}
      prefetch={false}
      data-color-role={statusTag?.colorRole}
      className={styles.overviewInlineCardLink}
    >
      <span className={styles.overviewInlineCardImageWrapper}>
        <NextImage
          src={imageUrl}
          width="200"
          height="200"
          layout="fixed"
          objectFit="contain"
          alt={page?.heading + " thumbnail"}
          aria-hidden
        />
      </span>
      <div className={styles.overviewInlineCardContent}>
        <Heading as="span" size="small" className={styles.overviewCardHeading}>
          <span>{page?.heading}</span>
          {statusTagWithoutStable && (
            <Tag
              size="small"
              variant="success"
              data-color-role={statusTag?.colorRole}
            >
              {statusTagWithoutStable.text}
            </Tag>
          )}
        </Heading>
        {page.description && <BodyLong>{page.description}</BodyLong>}
      </div>
      <ChevronRightIcon aria-hidden fontSize="1.5rem" />
    </Link>
  );
}

function OverviewCard({
  page,
}: {
  page: KOMPONENTOVERSIKT_QUERYResult[number];
}) {
  const imageUrl = urlForImage(page.status?.bilde as Image)?.url();

  /* TODO: Add fallback to svg or something */
  if (!imageUrl) {
    return null;
  }

  const statusTag = getStatusTag(page.status?.tag);
  const statusTagWithoutStable = getStatusTag(page.status?.tag, true);

  return (
    <Link
      href={`/${page?.slug}`}
      prefetch={false}
      data-color-role={statusTag?.colorRole}
      className={styles.overviewCardLink}
    >
      <span className={styles.overviewImageWrapper}>
        <NextImage
          src={imageUrl}
          width="200"
          height="200"
          layout="fixed"
          objectFit="contain"
          alt={page?.heading + " thumbnail"}
          aria-hidden
        />
      </span>
      <Heading as="span" size="small" className={styles.overviewCardHeading}>
        <span>{page?.heading}</span>
        {statusTagWithoutStable && (
          <Tag
            size="small"
            variant="success"
            data-color-role={statusTag?.colorRole}
          >
            {statusTagWithoutStable.text}
          </Tag>
        )}
      </Heading>
    </Link>
  );
}

function sortOverview(list: KOMPONENTOVERSIKT_QUERYResult) {
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
