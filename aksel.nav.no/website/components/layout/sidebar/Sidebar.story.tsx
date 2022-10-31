import { getActiveHeading } from "@/components";
import { DsSidebar } from "@/layout";
import { mockArtikkel, mockNav } from "@/mockdata";
import { PagePropsContext } from "@/utils";
import DesignsystemSidebar from "./DesignsystemSidebar";

export default {
  title: "LayoutsParts/Sidebar",
  component: DesignsystemSidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <DsSidebar />
    </PagePropsContext.Provider>
  );
};

Default.args = {
  page: mockArtikkel,
  navigation: mockNav,
  activeHeading: getActiveHeading(mockNav, "designsystem/side/oversikt-guider"),
  slug: "designsystem/side/oversikt-guider",
};
