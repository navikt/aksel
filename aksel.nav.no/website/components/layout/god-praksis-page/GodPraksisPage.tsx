import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import ArticleList from "./articles/ArticleList";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";
import { GpArticleListT } from "./types";

type GodPraksisPageProps = GpArticleListT;

function GodPraksisPage({ articles }: GodPraksisPageProps) {
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
              <Hero />
              <VStack gap="4">
                <ChipNav type="undertema" />
                <ChipNav type="innholdstype" />
              </VStack>
            </VStack>
            <ArticleList articles={articles} />
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
