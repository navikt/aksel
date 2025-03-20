import { Heading } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import styles from "./Designsystemet.module.css";

type DesignsystemetPageLayoutT = {
  children: React.ReactNode;
  layout?: "with-toc";
};

function DesignsystemetPageLayout({
  children,
  layout,
}: DesignsystemetPageLayoutT) {
  return (
    <main
      id="hovedinnhold"
      className={styles.pageLayoutMain}
      data-layout={layout}
    >
      {children}
    </main>
  );
}

type DesignsystemetPageT = {
  data: KOMPONENT_BY_SLUG_QUERYResult;
};

function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  return (
    <div>
      <Heading level="1" size="xlarge" className={styles.pageHeaderHeading}>
        {data?.heading}
      </Heading>
      {/* <BodyShort size="large">{        data?.intro?.body}123</BodyShort> */}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DesignsystemetPage(props: DesignsystemetPageT) {
  return <div>123</div>;
}

export {
  DesignsystemetPage,
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
};
