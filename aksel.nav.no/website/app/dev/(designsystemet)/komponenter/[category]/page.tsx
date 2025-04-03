import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { BodyLong, Heading } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { DesignsystemetPageLayout } from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";
import {
  DesignsystemetOverviewCard,
  sortDesignsystemetOverviewList,
} from "@/app/dev/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { sanityCategoryLookup } from "@/sanity/config";
import pagestyles from "../../_ui/Designsystemet.module.css";
import styles from "../../_ui/Overview.module.css";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig = sanityCategoryLookup("komponenter");

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category } = await params;

  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  return {
    title: currentCategory?.title,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

export async function generateStaticParams() {
  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    stega: false,
  });

  return (
    page?.oveview_pages?.map((overviewPage) => ({ category: overviewPage })) ??
    []
  );
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const [{ data: categoryPages }, { data: landingPage }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
      params: { category },
    }),
    sanityFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    }),
  ]);

  if (
    !landingPage?.oveview_pages ||
    !landingPage?.oveview_pages.some((itemValue) => itemValue === category) ||
    !categoryPages ||
    categoryPages.length === 0 ||
    !landingPage
  ) {
    notFound();
  }

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  if (!currentCategory) {
    notFound();
  }

  const list = sortDesignsystemetOverviewList(categoryPages);

  const ingress = landingPage?.[`ingress_${currentCategory.value}`];

  return (
    <DesignsystemetPageLayout>
      <div>
        <Heading
          level="1"
          size="xlarge"
          className={pagestyles.pageHeaderHeading}
        >
          {currentCategory.title}
        </Heading>
        {ingress && (
          <BodyLong size="large" className="mb-4 only:mb-7">
            <MarkdownText>{ingress}</MarkdownText>
          </BodyLong>
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
