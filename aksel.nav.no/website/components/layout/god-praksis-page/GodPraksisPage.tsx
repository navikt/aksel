import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import ArticleList from "./parts/ArticleList";
import ChipNav from "./parts/ChipNav";
import Hero from "./parts/Hero";

function GodPraksisPage() {
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
              <ChipNav />
            </VStack>
            <ArticleList />
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
