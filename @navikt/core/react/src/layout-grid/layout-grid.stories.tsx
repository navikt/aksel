import React from "react";
import { LayoutGrid } from "./LayoutGrid";

export default {
  title: "ds-react/LayoutGrid",
  component: LayoutGrid,
  argTypes: {},
};

export const Default = () => {
  return (
    <>
      <LayoutGrid>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 6 }}>
          Span 6
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span 3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span 3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
    .demo{
      background: blanchedalmond;
      padding: 2rem;
    }
    `}</style>
    </>
  );
};

export const CustomColumns = () => {
  return (
    <>
      <LayoutGrid columns={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 6 }}>
          Span 6
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span 3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 3 }}>
          Span 3
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
        <LayoutGrid.Cell className="demo" colSpan={{ xs: 2 }}>
          Span 2
        </LayoutGrid.Cell>
      </LayoutGrid>
      <style>{`
    .demo{
      background: blanchedalmond;
      padding: 2rem;
    }
    `}</style>
    </>
  );
};
