import { GetStaticProps } from "next/types";
import React from "react";
import {
  BodyLong,
  Box,
  Chips,
  CopyButton,
  Detail,
  HGrid,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
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
import { TOKEN_CATEGORIES } from "../../components/token-docs/config";
import TokenPreview from "../../components/token-docs/token/example/TokenPreview";
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

const Variant = ({ index, token }: { index: number; token: any }) => {
  const tokenText = `--ax-${token.name}`;
  return (
    <Box
      borderWidth={`${index === 0 ? 1 : 0} 0 1`}
      borderColor="border-subtle"
      paddingBlock="4"
      paddingInline="2"
    >
      <HStack gap="3">
        <TokenPreview token={token} />
        <VStack align="start" gap="2">
          <VStack align="start">
            <CopyButton
              copyText={tokenText}
              text={tokenText}
              iconPosition="right"
              size="xsmall"
            />
            {!["backgroundColor", "textColor", "borderColor"].includes(
              token.category,
            ) &&
              token.rawValue && (
                <Detail textColor="subtle">{token.rawValue}</Detail>
              )}
          </VStack>
          {token.comment && <Detail>{token.comment}</Detail>}
        </VStack>
      </HStack>
    </Box>
  );
};

const Section = ({
  category,
  description = "Lorem ipsum",
  tokens,
}: {
  category: string;
  description: string;
  tokens: (typeof tokenDocs)[number][];
}) => {
  const roles = tokens
    .filter((token) => token.role !== undefined)
    .map((token) => token.role)
    .filter(
      (role, index, array) => array.findIndex((r) => r === role) === index,
    )
    .sort();
  const sortedTokens = tokens.sort((a, b) => {
    switch (a.category) {
      case "backgroundColor":
      case "borderColor":
      case "textColor": {
        if ((a.role || "") > (b.role || "")) {
          return 1;
        } else if ((a.role || "") < (b.role || "")) {
          return -1;
        }
        return 0;
      }
      case "breakpoint":
        return (
          parseFloat(a.value.replace("px", "")) -
          parseFloat(b.value.replace("px", ""))
        );
      case "font": {
        if (a.group === b.group) {
          if (a.modifier === b.modifier) {
            return (
              parseFloat(a.rawValue.replace("rem", "")) -
              parseFloat(b.rawValue.replace("rem", ""))
            );
          }
          return (a.modifier || "").localeCompare(b.modifier || "", "nb") || -1;
        }
        return (a.group || "").localeCompare(b.group || "", "nb");
      }
      default:
        return parseFloat(a.rawValue.replace("px", "")) >
          parseFloat(b.rawValue.replace("px", ""))
          ? 1
          : -1;
    }
  });
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  return (
    <section>
      <Heading id={category} level="2" size="large" spacing>
        {TOKEN_CATEGORIES[category]}
      </Heading>
      <div>
        <VStack gap="4">
          <BodyLong as="p">{description}</BodyLong>
          <Chips>
            {roles.length > 0 &&
              roles.map((role) => (
                <Chips.Toggle
                  checkmark={false}
                  key={role}
                  selected={selectedRole === role}
                  onClick={() =>
                    selectedRole !== role
                      ? setSelectedRole(role)
                      : setSelectedRole(null)
                  }
                >
                  {role
                    .split("-")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" ")}
                </Chips.Toggle>
              ))}
          </Chips>
          <div>
            {sortedTokens
              .filter(
                (token) => selectedRole === null || token.role === selectedRole,
              )
              .map((token, index) => {
                return <Variant token={token} key={token.name} index={index} />;
              })}
          </div>
        </VStack>
      </div>
    </section>
  );
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
              <Section
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
