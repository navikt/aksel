import React from "react";
import LayoutGrid from "../layout-grid/LayoutGrid";
import { LayoutContainer } from "./LayoutContainer";

export default {
  title: "ds-react/LayoutContainer",
  component: LayoutContainer,
};

export const Default = (props) => {
  return (
    <LayoutContainer {...props}>
      <LayoutGrid
        columns={{ xs: 1, sm: 1, md: 4, lg: 4 }}
        areas={{
          xs: ["hero", "nav", "content"],
          md: ["hero hero hero hero", "nav content content content"],
        }}
      >
        <LayoutGrid.Cell className="demo" area="hero">
          Hero
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" area="nav">
          Nav
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" area="content">
          Content
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
    .demo{
      background: LightSeaGreen;
      padding: 1rem;
      width: 100%;
    }
    `}</style>
    </LayoutContainer>
  );
};

Default.args = {
  fullWidth: false,
};

export const DemoLayout = () => {
  return (
    <LayoutContainer>
      <LayoutGrid
        gap={{ xs: "0", sm: "0", md: "0", lg: "0" }}
        columns={{ xs: 1, sm: 1, md: 4, lg: 4 }}
        areas={{
          xs: ["hero", "nav", "content"],
          md: ["hero hero hero hero", "nav content content content"],
        }}
      >
        <LayoutGrid.Cell className="hero" area="hero">
          Hero
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="nav" area="nav">
          Nav
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="content" area="content">
          Content
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
    .hero{
      background: AliceBlue;
      width: 100%;
      height: 6rem;
    }
    .nav{
      background: LavenderBlush;
      height: 10rem;
    }
    @media (min-width: 64rem) {
      .nav{
        height: calc(100vh - 6rem);
      }
    }
    .content{
      background: Linen;
      height: calc(100vh - 6rem);
    }
    `}</style>
    </LayoutContainer>
  );
};

DemoLayout.parameters = {
  layout: "fullscreen",
};
