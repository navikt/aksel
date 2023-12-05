import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import ArticleList from "./articles/ArticleList";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";
import { GpArticleListT, HeroNavT } from "./types";

type GodPraksisPageProps = GpArticleListT & HeroNavT;

function GodPraksisPage({ articles, heroNav }: GodPraksisPageProps) {
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
              <Hero heroNav={heroNav}>
                Alle som jobber med produktutvikling i NAV sitter på kunnskap og
                erfaring som er nyttig for andre. Derfor deler vi god praksis
                med hverandre her.
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
