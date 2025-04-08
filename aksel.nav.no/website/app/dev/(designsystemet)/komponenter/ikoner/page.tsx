import { Metadata } from "next/types";
import meta from "@navikt/aksel-icons/metadata";
import { IconPage } from "@/app/dev/(designsystemet)/_ui/icon-page/IconPage";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Ikoner",
  description: `${
    Object.keys(meta).length
  } open source-ikoner designet og utviklet for Nav. Finn riktig ikon til din løsning.`,
  openGraph: {
    images: [
      {
        url: "https://aksel.nav.no/images/og/ikoner/og-ikoner.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page({ searchParams }: Props) {
  const _searchParams = await searchParams;

  const { iconName, iconQuery, iconToggle } =
    getIconStateFromSearchParams(_searchParams);

  return (
    <IconPage
      iconName={iconName}
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
    iconName: validIconName(iconName) ? iconName : undefined,
    iconQuery,
    iconToggle: iconToggle as "stroke" | "fill",
  };
}
