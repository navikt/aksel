"use server";

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
      <footer className="h-44 w-full bg-blue-800">asd</footer>
    </div>
  );
}
