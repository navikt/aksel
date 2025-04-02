import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import styles from "./_ui/Designsystemet.module.css";
import { DesignsystemSidebar } from "./_ui/sidebar/Sidebar";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.websitePage}>
      <Header />

      <div className={styles.pageLayout}>
        <DesignsystemSidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
