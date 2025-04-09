import { Metadata, ResolvingMetadata } from "next/types";
import React from "react";
import { Image } from "sanity";
import { VStack } from "@navikt/ds-react";
import { tokens } from "@navikt/ds-tokens/token_docs";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GRUNNLEGGENDE_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import TokensPage from "../../../../../components/token-docs/TokensPage";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "../../_ui/DesignsystemetPage";
import { getStaticParamsSlugs } from "../../slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await params;

  const { data: page } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: "tokens-darkside" },
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
}

export async function generateStaticParams() {
  return await getStaticParamsSlugs("ds_artikkel");
}

const Page = async () => {
  const parsedSlug = "tokens-darkside";
  const { data: page } = await sanityFetch({
    query: GRUNNLEGGENDE_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });
  const toc = [
    {
      id: "backgroundColor",
      title: "Background colors",
    },
    {
      id: "borderColor",
      title: "Border colors",
    },
    {
      id: "textColor",
      title: "Text colors",
    },
    {
      id: "shadow",
      title: "Shadows",
    },
    {
      id: "space",
      title: "Space",
    },
    {
      id: "radius",
      title: "Radius",
    },
    {
      id: "font",
      title: "Font",
    },
    {
      id: "breakpoint",
      title: "Breakpoint",
    },
  ];

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack gap="10">
        <DesignsystemetPageHeader data={page} />
        <TokensPage tokens={tokens} />
      </VStack>
      <TableOfContents
        feedback={{
          name: "Tokens darkside",
          text: "Send innspill",
        }}
        toc={toc}
      />
    </DesignsystemetPageLayout>
  );
};

export default Page;
