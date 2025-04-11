import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import styles from "./_ui/Produktbloggen.module.css";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Page className={styles.websitePage} footer={<Footer />}>
      <Header className={styles.header} />
      <div className={styles.pageLayout}>{children}</div>
    </Page>
  );
}
