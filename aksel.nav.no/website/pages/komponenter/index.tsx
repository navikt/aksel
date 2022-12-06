import { komponentLandingQuery, SidebarT } from "@/lib";
import { getClient } from "@/sanity-client";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";

const Page = ({ sidebar }: { sidebar: SidebarT }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Komponenter</title>
        <meta property="og:title" content="Komponenter" />
        <meta
          name="description"
          content="Komponenter fra designsystemet til NAV"
        />
      </Head>
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: "Komponenter" }}
      >
        abc
      </WithSidebar>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={komponentLandingQuery}
          props={props}
          params={{
            type: "komponent_artikkel",
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const { sidebar } = await getClient().fetch(komponentLandingQuery, {
    type: "komponent_artikkel",
  });

  return {
    props: {
      sidebar,
      slug: "/komponenter",
      preview,
    },
    revalidate: 60,
  };
};
