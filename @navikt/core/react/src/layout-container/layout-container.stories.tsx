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

export const MoteDemo = () => {
  return (
    <>
      <div className="wrapper">
        <LayoutContainer fluid={false}>
          <LayoutGrid>
            <LayoutGrid.Cell
              className="sidebar"
              colSpan={{ xs: 6, sm: 8, md: 4, lg: 3 }}
            >
              Sidebar
            </LayoutGrid.Cell>
            <LayoutGrid.Cell
              className="content"
              colSpan={{ xs: 6, sm: 8, md: 8, lg: 6 }}
            >
              Innhold
            </LayoutGrid.Cell>
            <LayoutGrid.Cell
              className="sidebar2"
              colSpan={{ xs: 6, sm: 8, md: 8, lg: 3 }}
              column={{ md: "5", lg: "0" }}
            >
              sidebar 2
            </LayoutGrid.Cell>
          </LayoutGrid>
        </LayoutContainer>
        <style>{`
      .wrapper{
        background: #f7f7f7;
        min-height: 100vh;
      }
      .content{
        background: blanchedalmond;
        height: 40vh;
        padding:2rem;
      }
      .sidebar {
        background: LightSlateGrey;
        height: 300px;
        padding:2rem;
      }
      @media (min-width: 48rem){
        .sidebar {
          height: 40vh;
          background: blanchedalmond;
        }
      }
      .sidebar2 {
        background: LightSlateGrey;
        height: 300px;
        padding:2rem;
      }
      @media (min-width: 64rem){
        .sidebar2 {
          height: 40vh;
          background: blanchedalmond;
        }
      }
      `}</style>
      </div>
    </>
  );
};

MoteDemo.parameters = {
  layout: "fullscreen",
};

export const CellDemo = () => {
  return (
    <>
      <div className="wrapper">
        <div className="desc desc-xs">xs: 0-30rem (0 - 479px)</div>
        <div className="desc desc-sm">sm: 30-48rem (480 - 767px)</div>
        <div className="desc desc-md">md: 48-64rem (768 - 1023px)</div>
        <div className="desc desc-lg">lg: 64-80rem (1024 - 1279px)</div>
        <div className="desc desc-xl">
          xl: 80rem-Infinity (1280px - Infinity)
        </div>
        <LayoutContainer fluid={false}>
          <LayoutGrid>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
            <LayoutGrid.Cell className="content" colSpan={{ xs: 1 }}>
              {" "}
            </LayoutGrid.Cell>
          </LayoutGrid>
        </LayoutContainer>
        <style>{`
      .wrapper{
        background: #f7f7f7;
        min-height: 100vh;
      }
      .desc {
        padding: 0.25rem 1rem;
      }
      .content{
        background: #A69CAC;
        height: 100vh;
        width: 100%;
      }
      .desc-sm,.desc-md,.desc-lg,.desc-xl {
        display: none;
      }

      @media (min-width: 30rem) {
        .content{
          background: #49dcb1;
        }
        .desc-xs {
          display: none;
        }
        .desc-sm {
          display: block;
        }
      }

      @media (min-width: 48rem) {
        .content{
          background: #474973;
        }
        .desc-sm {
          display: none;
        }
        .desc-md {
          display: block;
        }
      }

      @media (min-width: 64rem) {
        .content{
          background: #ffb30f;
        }
        .desc-sm {
          display: none;
        }
        .desc-md {
          display: none;
        }
        .desc-lg {
          display: block;
        }
      }

      @media (min-width: 80rem) {
        .content{
          background: #2c666e;
        }
        .desc-sm {
          display: none;
        }
        .desc-md {
          display: none;
        }
        .desc-lg {
          display: none;
        }
        .desc-xl {
          display: block;
        }
      }
      `}</style>
      </div>
    </>
  );
};

CellDemo.parameters = {
  layout: "fullscreen",
};
