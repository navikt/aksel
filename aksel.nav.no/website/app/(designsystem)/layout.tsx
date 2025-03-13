"use server";

import { Header } from "@/app/_ui/header/Header";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
