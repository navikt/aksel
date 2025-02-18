import { GetStaticProps } from "next/types";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import "@navikt/ds-css/darkside";
import {
  BodyLong,
  HStack,
  Search,
  Select,
  ToggleGroup,
} from "@navikt/ds-react";
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

const Page = ({ page, sidebar }: PageProps["props"]) => {
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
          title: "Grunnleggende",
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
        <Toolbar />
      </WithSidebar>
      <Footer />
    </>
  );
};

export default function GrunnleggendeFrontpage(props: PageProps["props"]) {
  return <Page {...props} />;
}
