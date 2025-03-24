import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { Sidebar } from "@/app/_ui/sidebar/Sidebar";
import styles from "./_ui/Designsystemet.module.css";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.websitePage}>
      <Header />

      <div className={styles.pageLayout}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
