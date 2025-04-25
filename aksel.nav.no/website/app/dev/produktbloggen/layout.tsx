import { Box, BoxNew, Page } from "@navikt/ds-react";
// @ts-expect-error module loading is a bit broken (@ routes for website)
import { PageBlock } from "@navikt/ds-react/Page";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import styles from "./_ui/Produktbloggen.module.css";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BoxNew background="brand-blue-soft" asChild>
      <Page className={styles.websitePage} footer={<Footer />}>
        <Header variant="produktbloggen" />

        <Box paddingBlock="space-64 space-128" asChild>
          <PageBlock gutters tabIndex={-1} id="hovedinnhold" as="main">
            {children}
          </PageBlock>
        </Box>
      </Page>
    </BoxNew>
  );
}
