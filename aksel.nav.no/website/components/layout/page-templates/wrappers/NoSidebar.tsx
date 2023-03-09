import { Footer } from "@/layout";
import { Header } from "components/layout/header/Header";
import React from "react";

export const NoSidebarLayout = ({
  children,
  aside = null,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) => {
  return (
    <>
      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-surface-subtle pt-4 focus:outline-none"
      >
        <div className="max-w-aksel mx-auto px-4 sm:w-[90%]">
          <article className="pt-12 pb-16 md:pb-32">{children}</article>
        </div>
        {aside}
      </main>
      <Footer />
    </>
  );
};
