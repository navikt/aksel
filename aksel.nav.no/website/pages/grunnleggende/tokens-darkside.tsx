import { GetStaticProps } from "next/types";
import React from "react";
import { BodyLong, HGrid, VStack } from "@navikt/ds-react";
import { tokens as tokenDocs } from "@navikt/ds-tokens/token_docs";
// import ComponentOverview from "@/cms/component-overview/ComponentOverview";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
// import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  ArticleListT,
  NextPageT,
  SidebarT,
} from "@/types";
import { generateSidebar } from "@/utils";
// import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import { SEO } from "@/web/seo/SEO";
import { TableOfContents } from "@/web/toc/TableOfContents";
import TokenCategory from "../../components/token-docs/TokenCategory";
import { TOKEN_CATEGORIES } from "../../components/token-docs/config";
import Toolbar from "../../components/token-docs/toolbar/Toolbar";

// import { grunnleggendeKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: SidebarT;
  links: ArticleListT;
}>;

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "grunnleggende",
)}, "links": *[_type == "ds_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori,"sidebarindex": sidebarindex}}`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { sidebar, page, links } = await getClient().fetch(query, {
    type: "ds_artikkel",
  });

  return {
    props: {
      page,
      sidebar: generateSidebar(sidebar, "grunnleggende"),
      links,
      slug: "/grunnleggende",
      preview,
      title: "Tokens darkside",
      id: page?._id ?? "",
    },
    revalidate: 60,
    notFound: false,
  };
};

const Page = ({ page, sidebar }: PageProps["props"]) => {
  const [searchData, setSearchData] = React.useState<{
    query: string;
    tokenType: "css" | "js";
  }>({
    query: "",
    tokenType: "css",
  });
  const filteredTokens = tokenDocs.filter((token) => {
    const stringifiedToken = JSON.stringify(token);
    const searchQuery = searchData.query.toLowerCase();
    return stringifiedToken.includes(searchQuery);
  });
  const addedCategories = [
    "backgroundColor",
    "borderColor",
    "textColor",
    "space",
    "shadow",
    "radius",
    "font",
    "breakpoint",
  ];
  const tokensWithCategoryAndRole = filteredTokens.filter((token) =>
    addedCategories.includes(token.category),
  );

  const categories = tokensWithCategoryAndRole
    .map((token) => token.category)
    .filter(
      (category, index, array) =>
        array.findIndex((cat) => cat === category) === index,
    )
    .sort((a, b) => addedCategories.indexOf(a) - addedCategories.indexOf(b));
  const toc = categories.map((category) => ({
    title: TOKEN_CATEGORIES[category],
    id: category,
    children: [],
  }));

  return (
    <>
      <SEO
        title="Tokens darkside"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{
          type: "grunnleggende",
          title: "Token-oversikt",
          rootUrl: "/grunnleggende",
          rootTitle: "Grunnleggende",
        }}
        intro={
          <BodyLong size="large" className="text-text-on-action">
            {page?.intro}
          </BodyLong>
        }
        pageProps={page}
      >
        <HGrid columns="auto 15rem" as="main" gap="10">
          <VStack gap="10">
            <Toolbar onSearch={setSearchData} />
            {categories.map((category) => (
              <TokenCategory
                key={category}
                category={category}
                description="Lorem ipsum"
                tokens={tokensWithCategoryAndRole.filter(
                  (token) => token.category === category,
                )}
              />
            ))}
          </VStack>
          <nav>
            <TableOfContents toc={toc} variant="subtle" />
          </nav>
        </HGrid>
      </WithSidebar>
      <Footer />
    </>
  );
};

export default function GrunnleggendeFrontpage(props: PageProps["props"]) {
  return <Page {...props} />;
}
