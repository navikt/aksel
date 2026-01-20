import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Link, HashRouter as Router } from "react-router";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "ds-react/Pagination",
  component: Pagination,
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small", "xsmall"],
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return <Pagination {...props} page={page} onPageChange={setPage} />;
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
    prevNextTexts: false,
  },
};

export const PrevNextText: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return (
      <div className="colgap" style={{ alignItems: "center" }}>
        <Pagination
          {...props}
          page={page}
          onPageChange={setPage}
          prevNextTexts
        />
        <Pagination
          {...props}
          page={page}
          onPageChange={setPage}
          prevNextTexts
          size="small"
        />
        <Pagination
          {...props}
          page={page}
          onPageChange={setPage}
          prevNextTexts
          size="xsmall"
        />
      </div>
    );
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  },
};

export const Small: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return (
      <Pagination {...props} page={page} onPageChange={setPage} size="small" />
    );
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  },
};

export const XSmall: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return (
      <Pagination {...props} page={page} onPageChange={setPage} size="xsmall" />
    );
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  },
};

export const Heading: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return (
      <>
        <h2>Heading før pagination</h2>
        <Pagination
          {...props}
          page={page}
          onPageChange={setPage}
          srHeading={{ tag: "h2", text: "Dette er en pagination heading" }}
        />
        <h2>Heading etter pagination</h2>
      </>
    );
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  },
};

export const AsLink: Story = {
  render: (props) => {
    const [page, setPage] = useState(2);
    return (
      <Pagination
        {...props}
        page={page}
        onPageChange={setPage}
        renderItem={(item) => (
          <Pagination.Item {...item} as={Link} to={`?page=${item.page}`} />
        )}
      />
    );
  },
  args: {
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

export const ColorRole = () => {
  const [page, setPage] = useState(2);
  return (
    <Pagination
      count={8}
      siblingCount={1}
      boundaryCount={1}
      page={page}
      onPageChange={setPage}
      data-color="brand-magenta"
    />
  );
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  PrevNextText,
  Small,
  XSmall,
  Heading,
  AsLink,
  ColorRole,
});
Chromatic.args = { count: 8, siblingCount: 1, boundaryCount: 1 };
Chromatic.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
