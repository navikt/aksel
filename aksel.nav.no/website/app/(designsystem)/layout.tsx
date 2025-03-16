"use server";

import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { Sidebar } from "@/app/_ui/sidebar/Sidebar";
import styles from "./layout.module.css";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className={styles.pageLayout}>
        <Sidebar />
        <main id="hovedinnhold" className="flex w-full flex-auto py-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
