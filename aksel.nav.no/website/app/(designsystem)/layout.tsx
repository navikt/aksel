"use server";

import { Header } from "@/app/_ui/header/Header";
import { Sidebar } from "@/app/_ui/sidebar/Sidebar";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-auto">
        <Sidebar />

        {children}
      </div>
    </div>
  );
}
