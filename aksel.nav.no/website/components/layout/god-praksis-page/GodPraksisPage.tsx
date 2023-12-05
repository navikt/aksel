import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import ArticleList from "./articles/ArticleList";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";
import { GpArticleListT, GpTemaT, HeroNavT } from "./types";

type GodPraksisPageProps = GpArticleListT &
  HeroNavT & {
    tema?: GpTemaT["tema"];
  };

function GodPraksisPage({ articles, heroNav, tema }: GodPraksisPageProps) {
  return (
    /* TODO: Add surface-subtle to page-component props */
    <Page
      footer={<Footer />}
      footerPosition="belowFold"
      className="bg-surface-subtle"
    >
      <Header variant="subtle" />
      <Box paddingBlock="10">
        <Page.Block width="xl" gutters>
          <VStack gap="10">
            <VStack gap="6">
              <Hero heroNav={heroNav} tema={tema}>
                {tema?.description}
              </Hero>
              <ChipNav
                options={["WCAG", "Testing", "Kompetanse", "Retningslinjer"]}
                type="innholdstype"
              />
            </VStack>
            <ArticleList articles={articles} />
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
