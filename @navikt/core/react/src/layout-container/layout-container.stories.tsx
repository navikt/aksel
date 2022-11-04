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

export const DemoLayout2 = () => {
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <LayoutContainer fluid padding={{ sm: "0", md: "0", lg: "0" }}>
            Home
          </LayoutContainer>
        </header>
        <LayoutContainer fluid padding={{ sm: "0", md: "0", lg: "0" }}>
          <LayoutGrid
            columns={{ xs: 1, sm: 1, md: 4, lg: 4 }}
            areas={{
              xs: ["content"],
              md: ["sidebar content content content"],
            }}
            className="spacer"
          >
            <LayoutGrid.Cell className="sidebar" area="sidebar">
              Sidebar
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" area="content">
              Content
            </LayoutGrid.Cell>
          </LayoutGrid>
        </LayoutContainer>
        <style>{`
      .wrapper{
        background: #f7f7f7;
        min-height: 100vh;
      }
      .header{
        background: #262626;
        color: white;
        height: 3rem;
        display: flex;
        align-items: center;
      }
      .spacer{
        margin-top: 4rem;
      }
      .content{
        background: blanchedalmond;
        height: 100vh;
        max-width: 600px;
      }
      .sidebar {
        background: blanchedalmond;
        height: 100vh;
        display: none;
      }
      @media (min-width: 64rem){
        .sidebar {
          display: block;
        }
      }
      `}</style>
      </div>
    </>
  );
};

DemoLayout2.parameters = {
  layout: "fullscreen",
};
