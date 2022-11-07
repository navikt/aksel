import { getActiveHeading } from "@/components";
import { mockArtikkel, mockNav } from "@/mockdata";
import { PagePropsContext } from "@/utils";
import Footer from "./Footer";

export default {
  title: "LayoutsParts/Footer",
  component: Footer,
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

export const AkselFooter = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <Footer variant="aksel" />
    </PagePropsContext.Provider>
  );
};

AkselFooter.args = args;

export const DsFooter = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <Footer variant="ds" />
    </PagePropsContext.Provider>
  );
};

DsFooter.args = args;
