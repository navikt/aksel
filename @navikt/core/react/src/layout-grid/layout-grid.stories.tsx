import React from "react";
import { LayoutGrid } from "./LayoutGrid";

export default {
  title: "ds-react/LayoutGrid",
  component: LayoutGrid,
  argTypes: {},
};

export const Default = () => {
  return (
    <div className="wrapper">
      <LayoutGrid>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 6 }}>
          Span6
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
      .wrapper{
        width: 80vw;
      }
    .demo{
      background: blanchedalmond;
      padding: 2rem;
    }
    `}</style>
    </div>
  );
};

export const CustomColumns = () => {
  return (
    <div className="wrapper">
      <LayoutGrid columns={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 6 }}>
          Span6
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span2
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
      .wrapper{
        width: 80vw;
      }
    .demo{
      background: blanchedalmond;
      padding: 2rem;
    }
    `}</style>
    </div>
  );
};

export const Rows = () => {
  return (
    <div className="wrapper">
      <LayoutGrid columns={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
        <LayoutGrid.Cell className="demo" row={{ xs: "2" }} colSpan={{ xs: 2 }}>
          Row2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span4
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span4
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
      .wrapper{
        width: 80vw;
      }
    .demo{
      background: blanchedalmond;
      padding: 2rem;
    }
    `}</style>
    </div>
  );
};

export const Areas = () => {
  return (
    <div className="wrapper">
      <LayoutGrid
        columns={{ xs: 1, sm: 4, md: 4, lg: 6 }}
        areas={{
          xs: ["desc", "heading", "details"],
          sm: ["desc desc desc desc", "heading heading details details"],
          md: ["heading desc desc details"],
          lg: ["desc desc desc desc heading details"],
        }}
      >
        <LayoutGrid.Cell className="demo" area="desc">
          desc
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" area="heading">
          heading
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" area="details">
          details
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
      .wrapper{
        width: 80vw;
        background: Gainsboro;
        border-radius: 8px;
        padding: 1rem;
      }
    .demo{
      background: LightSeaGreen;
      padding: 1rem;
    }
    `}</style>
    </div>
  );
};
