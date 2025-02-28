import { GetStaticProps } from "next/types";
import React from "react";
import { MoonIcon, PaletteIcon, SunIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Chips,
  CopyButton,
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
    case "bg":
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
    case "border":
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
    case "text":
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

const TokenExample = ({ token }: { token: any }) => {
  switch (token.type) {
    case "color":
      return <ColorToken token={token} />;
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
  bg: "Background colors",
  border: "Border colors",
  text: "Text colors",
};

const Section = ({
  category,
  description = "Lorem ipsum",
  tokensByRole,
}: {
  category: string;
  description: string;
  tokensByRole: Record<string, (typeof tokenDocs)[number]>;
}) => {
  const roles = Object.keys(tokensByRole);
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
            {roles.map((role) => (
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
            {roles
              .filter((role) => (selectedRole ? role === selectedRole : true))
              .sort((roleA, roleB) => (roleA > roleB ? 1 : -1))
              .map((role, index) =>
                Object.values(tokensByRole[role])
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((token) => {
                    return (
                      <Variant token={token} key={token.name} index={index} />
                    );
                  }),
              )}
          </div>
        </VStack>
      </div>
    </section>
  );
};

const Page = ({ page, sidebar }: PageProps["props"]) => {
  const addedCategories = ["color"];
  const tokensWithCategoryAndRole = tokenDocs.filter((token) =>
    addedCategories.includes(token.type),
  );
  const tokensOfOtherTypes = tokenDocs
    .filter((token) => !addedCategories.includes(token.type))
    .map(({ type }) => type)
    .reduce(
      (acc, curr) => [...acc, ...(!acc.includes(curr) ? [curr] : [])],
      [] as string[],
    );
  // eslint-disable-next-line no-console
  console.log("Tokens of other types", tokensOfOtherTypes);
  const tokensByCategoryAndRole = tokensWithCategoryAndRole.reduce(
    (acc, curr) => {
      if (!curr.category) {
        // eslint-disable-next-line no-console
        console.log("Missing category", curr);
        return acc;
      }
      if (!curr.role) {
        // eslint-disable-next-line no-console
        console.log("Missing role", curr);
        return acc;
      }
      if (!curr.modifier) {
        // eslint-disable-next-line no-console
        console.log("Missing modifier", curr);
        return acc;
      }
      return {
        ...acc,
        [curr.category]: {
          ...acc[curr.category],
          [curr.role || 0]: {
            ...(acc[curr.category] || [])[curr.role || 0],
            [curr.modifier]: curr,
          },
        },
      };
    },
    {} as Record<string, Record<string, (typeof tokenDocs)[number]>>,
  );
  const toc = tokensWithCategoryAndRole
    .map((token) => token.category)
    .filter(
      (category, index, array) =>
        array.findIndex((cat) => cat === category) === index,
    )
    .map((category) => ({
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
            {Object.entries(tokensByCategoryAndRole).map(
              ([category, categoryRoles]) => {
                // eslint-disable-next-line no-console
                console.log("categoryRoles", categoryRoles);
                return (
                  <Section
                    key={category}
                    category={category}
                    description="Lorem ipsum"
                    tokensByRole={categoryRoles}
                  />
                );
              },
            )}
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
