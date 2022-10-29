import { AkselHeader, Footer } from "@/layout";
import React from "react";

export const NoSidebarLayout = ({
  children,
  variant = "artikkel",
  aside = null,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  variant?: "forside" | "artikkel" | "blogg";
}) => {
  return (
    <>
      <AkselHeader variant={variant} />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-4 focus:outline-none"
      >
        <div className="mx-auto max-w-aksel px-4 xs:w-[90%]">
          <article className="pt-12 pb-16 md:pb-32">{children}</article>
        </div>
        {aside}
      </main>
      <Footer variant="aksel" />
    </>
  );
};
