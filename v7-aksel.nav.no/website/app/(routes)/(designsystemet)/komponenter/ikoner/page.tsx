import { Metadata } from "next/types";
import { z } from "zod";
import meta from "@navikt/aksel-icons/metadata";
import { IconPage } from "@/app/(routes)/(designsystemet)/_ui/icon-page/IconPage";

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

  let iconSvg: string | undefined;

  if (iconName) {
    const iconUrl = `https://raw.githubusercontent.com/navikt/aksel/main/%40navikt/aksel-icons/icons/${iconName}.svg`;

    iconSvg = await fetch(iconUrl)
      .then((r) => r.text())
      .catch(() => undefined);
  }

  return (
    <IconPage
      iconName={iconName}
      iconQuery={iconQuery}
      iconToggle={iconToggle}
      iconSvg={iconSvg}
    />
  );
}

const filterSearchParams = z.object({
  iconName: z
    .enum(Object.keys(meta) as [keyof typeof meta])
    .optional()
    .catch(undefined),
  iconQuery: z.string().optional().catch(undefined),
  iconToggle: z.enum(["stroke", "fill"]).default("stroke").catch("stroke"),
});

type Filters = z.infer<typeof filterSearchParams>;

function getIconStateFromSearchParams(
  searchParams: Awaited<Props["searchParams"]>,
): Filters {
  let { iconName, iconQuery, iconToggle } = searchParams;

  iconName = Array.isArray(iconName) ? iconName[0] : iconName;
  iconQuery = Array.isArray(iconQuery) ? iconQuery[0] : iconQuery;
  iconToggle = Array.isArray(iconToggle) ? iconToggle[0] : iconToggle;

  const parsed = filterSearchParams.safeParse({
    iconName,
    iconQuery,
    iconToggle,
  });

  return {
    iconToggle: parsed.data?.iconToggle ?? "stroke",
    iconName: parsed.data?.iconName,
    iconQuery: parsed.data?.iconQuery,
  };
}
