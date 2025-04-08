import meta from "@navikt/aksel-icons/metadata";
import { IconPage } from "@/app/dev/(designsystemet)/_ui/icon-page/IconPage";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/* const categoryConfig = sanityCategoryLookup("grunnleggende"); */

/* export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category } = await params;

  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
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
} */

export default async function Page({ searchParams }: Props) {
  const _searchParams = await searchParams;

  const { iconName, iconQuery, iconToggle } =
    getIconStateFromSearchParams(_searchParams);

  return (
    <IconPage
      iconName={validIconName(iconName) ? iconName : undefined}
      iconQuery={iconQuery}
      iconToggle={iconToggle}
    />
  );
}

function validIconName(iconName: string | undefined) {
  if (!iconName) {
    return false;
  }

  return !!meta[iconName];
}

function getIconStateFromSearchParams(
  searchParams: Awaited<Props["searchParams"]>,
) {
  let { iconName, iconQuery, iconToggle } = searchParams;

  iconName = Array.isArray(iconName) ? iconName[0] : iconName;
  iconQuery = Array.isArray(iconQuery) ? iconQuery[0] : iconQuery;
  iconToggle = Array.isArray(iconToggle) ? iconToggle[0] : iconToggle;

  if (iconToggle !== "stroke" && iconToggle !== "fill") {
    iconToggle = "stroke";
  }

  return {
    iconName,
    iconQuery,
    iconToggle: iconToggle as "stroke" | "fill",
  };
}
