import { Box } from "@navikt/ds-react";
import { Page as AkselPage, PageBlock } from "@navikt/ds-react/Page";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";

export default async function GodPraksisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AkselPage footer={<Footer />} footerPosition="belowFold">
      <Header />
      <Box paddingBlock="space-40" tabIndex={-1} id="hovedinnhold" asChild>
        <PageBlock width="xl" gutters as="main">
          {children}
        </PageBlock>
      </Box>
    </AkselPage>
  );
}
