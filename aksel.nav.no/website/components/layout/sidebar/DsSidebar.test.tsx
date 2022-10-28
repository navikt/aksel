/**
 * @jest-environment jsdom
 */
import { mockArtikkel, mockNav } from "@/mockdata";
import { getActiveHeading, PagePropsContext } from "@/utils";
import { render, screen } from "@testing-library/react";
import DesignsystemSidebar from "./DesignsystemSidebar";

const renderComponent = (withActiveHeading = true) => {
  return render(
    <PagePropsContext.Provider
      value={{
        pageProps: {
          page: mockArtikkel,
          navigation: mockNav,
          activeHeading: withActiveHeading
            ? getActiveHeading(mockNav, "designsystem/side/oversikt-guider")
            : undefined,
        },
      }}
    >
      <DesignsystemSidebar />
    </PagePropsContext.Provider>
  );
};

describe("Home", () => {
  it("Renders sidebar when activeHeading", () => {
    renderComponent();
    const sidebar = screen.getByTestId("ds-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("No sidebar when no activeHeading", () => {
    renderComponent(false);
    expect(() => screen.getByTestId("ds-sidebar")).toThrow();
  });
});
