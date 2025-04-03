import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { BodyShort, Heading, Tag } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { KOMPONENTOVERSIKT_QUERY } from "@/app/_sanity/queries";
import { KOMPONENTOVERSIKT_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import pagestyles from "../_ui/Designsystemet.module.css";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import styles from "../_ui/Overview.module.css";

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
export default async function Page() {
  const { data: components } = await sanityFetch({
    query: KOMPONENTOVERSIKT_QUERY,
  });

  if (!components || components.length === 0) {
    notFound();
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
      </div>

      <ul className={styles.overviewGrid}>
        {list.map((component) => (
          <li key={component.heading} className={styles.overviewLi}>
            <OverviewCard page={component} />
          </li>
        ))}
      </ul>
    </DesignsystemetPageLayout>
  );
}

function OverviewCard({
  page,
}: {
  page: KOMPONENTOVERSIKT_QUERYResult[number];
}) {
  const imageUrl = urlForImage(page.status?.bilde as Image)?.url();

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
        {imageUrl ? (
          <NextImage
            src={imageUrl}
            width={200}
            height={200}
            alt={page?.heading + " thumbnail"}
            aria-hidden
          />
        ) : (
          <FallbackSvg />
        )}
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

function FallbackSvg() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 153C129.271 153 153 129.271 153 100C153 70.7289 129.271 47 100 47C70.7289 47 47 70.7289 47 100C47 129.271 70.7289 153 100 153ZM100 165C135.899 165 165 135.899 165 100C165 64.1015 135.899 35 100 35C64.1015 35 35 64.1015 35 100C35 135.899 64.1015 165 100 165Z"
        fill="#001630"
        fillOpacity="0.188235"
      />
      <path
        d="M96.768 67C97.5378 65.6667 99.4622 65.6667 100.232 67L112.789 88.75C113.559 90.0833 112.597 91.75 111.057 91.75H85.9426C84.403 91.75 83.4408 90.0833 84.2106 88.75L96.768 67Z"
        fill="#5D6573"
      />
      <path
        d="M96 114.5C96 121.956 89.9558 128 82.5 128C75.0442 128 69 121.956 69 114.5C69 107.044 75.0442 101 82.5 101C89.9558 101 96 107.044 96 114.5Z"
        fill="#5D6573"
      />
      <path
        d="M105 104C105 102.895 105.895 102 107 102H129C130.105 102 131 102.895 131 104V126C131 127.105 130.105 128 129 128H107C105.895 128 105 127.105 105 126V104Z"
        fill="#5D6573"
      />
    </svg>
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
