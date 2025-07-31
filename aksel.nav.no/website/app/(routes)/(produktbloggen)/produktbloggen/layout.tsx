import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import styles from "./_ui/Produktbloggen.module.css";

export default async function ProduktbloggenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Page className={styles.websitePage} footer={<Footer />}>
      <Header variant="produktbloggen" />
      <main tabIndex={-1} id="hovedinnhold" className={styles.main}>
        <PageBlock>{children}</PageBlock>
      </main>
    </Page>
  );
}
