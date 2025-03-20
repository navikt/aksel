import { GetStaticProps } from "next/types";
import React from "react";
import { LineHeightIcon, SpaceHorizontalIcon } from "@navikt/aksel-icons";
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
import {
  LegacyBgColorKeys,
  LegacySurfaceColorKeys,
} from "@navikt/ds-tokens/types";
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
import BreakpointToken from "../../components/token-docs/token/example/BreakpointToken";
import ColorToken from "../../components/token-docs/token/example/ColorToken";
import ShadowToken from "../../components/token-docs/token/example/ShadowToken";
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

const ExampleContainer = ({
  background,
  children,
}: {
  background?: LegacyBgColorKeys | LegacySurfaceColorKeys;
  children: React.ReactElement;
}) => (
  <Box
    background={background}
    padding="3"
    borderColor="border-subtle"
    borderRadius="medium"
    borderWidth="1"
    height="58px"
    width="58px"
  >
    {children}
  </Box>
);

const FontToken = ({ token }: { token: (typeof tokenDocs)[number] }) => {
  let fontStyling = {
    fontSize: "24px",
    fontFamily: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
  };
  switch (token.group) {
    case "family":
      fontStyling = {
        ...fontStyling,
        fontFamily: token.value,
      };
      break;
    case "size":
      fontStyling = {
        ...fontStyling,
        fontSize: token.value,
      };
      break;
    case "weight":
      fontStyling = {
        ...fontStyling,
        fontWeight: token.value,
      };
      break;
    case "line-height":
      return (
        <VStack as="div" align="center" justify="center" height="100%">
          <LineHeightIcon width="32px" height="32px" title={token.name} />
        </VStack>
      );
  }
  return (
    <VStack as="div" align="center" justify="center" height="100%">
      <Heading size="medium" style={fontStyling}>
        Aa
      </Heading>
    </VStack>
  );
};

const SpaceToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <SpaceHorizontalIcon
      title={token.name}
      color={token.value}
      fontSize="1.5rem"
    />
  </VStack>
);

const RadiusToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <VStack as="div" align="center" justify="center" height="100%">
    <Box
      as="div"
      width="32px"
      height="32px"
      background="surface-neutral"
      style={{
        borderRadius: token.value,
      }}
    />
  </VStack>
);

const TokenExample = ({ token }: { token: any }) => {
  switch (token.category) {
    case "backgroundColor":
    case "borderColor":
    case "textColor":
      return <ColorToken token={token} />;
    case "font":
      return <FontToken token={token} />;
    case "space":
      return <SpaceToken token={token} />;
    case "shadow":
      return <ShadowToken token={token} />;
    case "radius":
      return <RadiusToken token={token} />;
    case "breakpoint":
      return (
        <VStack as="div" align="center" justify="center" height="100%">
          <BreakpointToken token={token} />
        </VStack>
      );
    default:
      return (
        <Box
          borderColor="border-subtle"
          borderRadius="medium"
          background="bg-default"
          borderWidth="1"
          width="32px"
          height="32px"
        />
      );
  }
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
        <ExampleContainer
          background={
            token.category === "textColor" && token.modifier === "contrast"
              ? "surface-neutral"
              : undefined
          }
        >
          <TokenExample token={token} />
        </ExampleContainer>
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

const Categories = {
  backgroundColor: "Background colors",
  borderColor: "Border colors",
  textColor: "Text colors",
  shadow: "Shadows",
  space: "Spacing",
  radius: "Radius",
  font: "Fonts",
  breakpoint: "Breakpoints",
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
        {Categories[category]}
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
    title: Categories[category],
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
