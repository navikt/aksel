import { getActiveHeading } from "@/components";
import { mockArtikkel, mockNav } from "@/mockdata";
import { PagePropsContext } from "@/utils";
import AkselHeader from "./AkselHeader";
import DesignsystemHeader from "./DesignsystemHeader";

export default {
  title: "LayoutsParts/Header",
  component: AkselHeader,
  subComponents: {
    DesignsystemHeader,
  },
  parameters: {
    layout: "fullscreen",
  },
};

const args = {
  page: mockArtikkel,
  navigation: mockNav,
  activeHeading: getActiveHeading(mockNav, "designsystem/side/oversikt-guider"),
  slug: "designsystem/side/oversikt-guider",
};

export const ArtikkelHeader = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <AkselHeader variant="artikkel" />
    </PagePropsContext.Provider>
  );
};

ArtikkelHeader.args = args;
export const ArtikkelForside = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <AkselHeader variant="forside" />
    </PagePropsContext.Provider>
  );
};

ArtikkelForside.args = args;

export const BloggHeader = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <AkselHeader variant="blogg" />
    </PagePropsContext.Provider>
  );
};

BloggHeader.args = args;

export const DesignsystemHeaderWNav = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <DesignsystemHeader />
    </PagePropsContext.Provider>
  );
};

DesignsystemHeaderWNav.args = args;

export const DesignsystemHeaderNoNav = (props) => {
  return (
    <PagePropsContext.Provider
      value={{ pageProps: { ...props, activeHeading: null } }}
    >
      <DesignsystemHeader />
    </PagePropsContext.Provider>
  );
};

DesignsystemHeaderWNav.args = args;
