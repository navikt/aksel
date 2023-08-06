import React from "react";
import { Columns } from ".";

export default {
  title: "ds-react/Columns",
  component: Columns,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <Columns>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const Gap = {
  render: () => (
    <Columns gap={{ sm: "6" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const Width = {
  render: () => (
    <Columns gap={{ sm: "6" }} columns={{ sm: 1, lg: "2fr 1fr 2fr 1fr" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const DynamicWidth = {
  render: () => (
    <Columns
      gap={{ sm: "6", lg: "8" }}
      columns={{ sm: "1fr 3fr", lg: "2fr 2fr" }}
    >
      <Placeholder text="1" />
      <Placeholder text="2" />
    </Columns>
  ),
};

export const CardsStacking = {
  render: () => (
    <Columns
      gap={{ xs: "4", sm: "6", lg: "8" }}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    >
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const PageLayout = {
  render: () => (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "rgba(0 0 0 / 0.2)",
        padding: "2rem 1rem",
      }}
    >
      <Columns
        gap={{ xs: "4", sm: "6", lg: "8" }}
        columns={{ sm: 1, md: "1fr auto" }}
      >
        <Content text="Content" />
        <Sidebar text="Sidebar" />
      </Columns>
    </div>
  ),
};

export const StaticSidebar = {
  render: () => (
    <div
      style={{
        background: "rgba(0 0 0 / 0.2)",
        padding: "2rem 0rem",
      }}
    >
      <Columns
        gap={{ xs: "4", sm: "6", lg: "8" }}
        columns={{ sm: 1, md: "250px auto" }}
      >
        <Sidebar text="Sidebar" />
        <ContentStatic text="Content" />
      </Columns>
    </div>
  ),
};

function Content({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "40rem",
        width: "100%",
        maxWidth: "600px",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

function ContentStatic({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "40rem",
        width: "100%",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

function Sidebar({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "40rem",
        width: "250px",
        color: "white",
      }}
      className="hideOnMd"
    >
      {text}
    </div>
  );
}

function Placeholder({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "20rem",
        width: "auto",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}
