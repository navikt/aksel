import { GetStaticProps } from "next/types";
import React from "react";
import {
  MoonIcon,
  PaletteIcon,
  SpaceHorizontalIcon,
  SunIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Chips,
  CopyButton,
  Detail,
  HGrid,
  HStack,
  Heading,
  Link,
  Search,
  Select,
  ToggleGroup,
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
import TableOfContents from "@/web/toc/TableOfContents";

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

const SearchField = () => {
  return <Search label="Søk etter token" hideLabel />;
};

const Toolbar = () => {
  return (
    <HStack as="nav" align="center" justify="space-between" marginBlock="0 4">
      <div style={{ width: "19rem" }}>
        <SearchField />
      </div>
      <HStack gap="2" width="">
        <Select label="Velg bostedsland" hideLabel style={{ width: "9rem" }}>
          <option value="css">CSS</option>
          <option value="js">JS</option>
        </Select>
        <ToggleGroup defaultValue="light" onChange={console.info}>
          <ToggleGroup.Item
            value="light"
            icon={<SunIcon title="Lys modus" />}
          />
          <ToggleGroup.Item
            value="dark"
            icon={<MoonIcon title="Mørk modus" />}
          />
        </ToggleGroup>
      </HStack>
    </HStack>
  );
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

const ColorToken = ({ token }: { token: any }) => {
  switch (token.category) {
    case "backgroundColor":
      return (
        <ExampleContainer>
          <Box
            borderColor="border-subtle"
            borderRadius="full"
            borderWidth="1"
            style={{ backgroundColor: token.value }}
            width="32px"
            height="32px"
          />
        </ExampleContainer>
      );
    case "borderColor":
      return (
        <ExampleContainer>
          <Box
            borderRadius="full"
            borderWidth="4"
            width="32px"
            height="32px"
            style={{ borderColor: token.value }}
          />
        </ExampleContainer>
      );
    case "textColor":
      switch (token.modifier) {
        case "contrast":
          return (
            <ExampleContainer background="surface-neutral">
              <Box width="32px" height="32px">
                <VStack as="div" align="center" justify="center" height="100%">
                  <Heading size="medium" style={{ color: token.value }}>
                    Aa
                  </Heading>
                </VStack>
              </Box>
            </ExampleContainer>
          );
        case "icon":
          return (
            <ExampleContainer>
              <Box width="32px" height="32px">
                <VStack as="div" align="center" justify="center" height="100%">
                  <PaletteIcon
                    title="a11y-title"
                    color={token.value}
                    fontSize="1.5rem"
                  />
                </VStack>
              </Box>
            </ExampleContainer>
          );
        default:
          return (
            <ExampleContainer>
              <Box width="32px" height="32px">
                <VStack as="div" align="center" justify="center" height="100%">
                  <Heading size="medium" style={{ color: token.value }}>
                    Aa
                  </Heading>
                </VStack>
              </Box>
            </ExampleContainer>
          );
      }
    default:
      return (
        <ExampleContainer>
          <Box
            borderRadius="medium"
            borderWidth="1"
            background={token.value}
            width="32px"
            height="32px"
          />
        </ExampleContainer>
      );
  }
};

const SpaceToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <ExampleContainer>
    <VStack as="div" align="center" justify="center" height="100%">
      <SpaceHorizontalIcon
        title={token.name}
        color={token.value}
        fontSize="1.5rem"
      />
    </VStack>
  </ExampleContainer>
);

const ShadowToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <ExampleContainer>
    <VStack as="div" align="center" justify="center" height="100%">
      <Box
        borderRadius="medium"
        borderWidth="1"
        borderColor="border-subtle"
        width="32px"
        height="32px"
        style={{ boxShadow: token.value }}
      />
    </VStack>
  </ExampleContainer>
);

const RadiusToken = ({ token }: { token: (typeof tokenDocs)[number] }) => (
  <ExampleContainer>
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
  </ExampleContainer>
);

const TokenExample = ({ token }: { token: any }) => {
  switch (token.category) {
    case "backgroundColor":
    case "borderColor":
    case "textColor":
      return <ColorToken token={token} />;
    case "space":
      return <SpaceToken token={token} />;
    case "shadow":
      return <ShadowToken token={token} />;
    case "radius":
      return <RadiusToken token={token} />;
    default:
      return (
        <ExampleContainer>
          <Box
            borderColor="border-subtle"
            borderRadius="medium"
            background="bg-default"
            borderWidth="1"
            width="32px"
            height="32px"
          />
        </ExampleContainer>
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
        <TokenExample token={token} />
        <VStack align="start">
          <CopyButton
            copyText={tokenText}
            text={tokenText}
            iconPosition="right"
            size="xsmall"
          />
          {token.rawValue && (
            <Detail textColor="subtle">{token.rawValue}</Detail>
          )}
          <BodyLong as="p">
            {token.comment || (
              <>
                Beskrivelse av hva token brukes til. Kan også linke til{" "}
                <Link href="#">komponenter</Link>.
              </>
            )}
          </BodyLong>
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
  radius: "Border radius",
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
  const addedCategories = [
    "backgroundColor",
    "borderColor",
    "textColor",
    "space",
    "shadow",
    "radius",
    //"font",
    //"breakpoint",
  ];
  const tokensWithCategoryAndRole = tokenDocs.filter((token) =>
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
            <Toolbar />
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
