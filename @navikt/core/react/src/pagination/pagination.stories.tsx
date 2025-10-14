import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Link, HashRouter as Router } from "react-router";
import { VStack } from "../layout/stack";
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
type StoryFunction = StoryFn<typeof Pagination>;

export const Default: StoryFunction = (props) => {
  const [page, setPage] = useState(2);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
};

Default.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
  prevNextTexts: false,
};

export const PrevNextText: StoryFunction = (props) => {
  const [page, setPage] = useState(2);
  return (
    <div className="colgap" style={{ alignItems: "center" }}>
      <Pagination {...props} page={page} onPageChange={setPage} prevNextTexts />
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
};

PrevNextText.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};

export const Small: StoryFunction = (props) => {
  const [page, setPage] = useState(2);

  return (
    <Pagination {...props} page={page} onPageChange={setPage} size="small" />
  );
};

Small.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};
export const XSmall: StoryFunction = (props) => {
  const [page, setPage] = useState(2);

  return (
    <Pagination {...props} page={page} onPageChange={setPage} size="xsmall" />
  );
};

XSmall.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};

export const Heading: StoryFunction = (props) => {
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
};

Heading.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};

export const AsLink: StoryFunction = (props) => {
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
};

AsLink.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};

AsLink.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];

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

export const Chromatic: Story = {
  render: (props) => (
    <VStack gap="8">
      <div>
        <h2>Default</h2>
        <Default {...props} />
      </div>
      <div>
        <h2>PrevNextText</h2>
        <PrevNextText {...props} />
      </div>
      <div>
        <h2>Small</h2>
        <Small {...props} />
      </div>
      <div>
        <h2>XSmall</h2>
        <XSmall {...props} />
      </div>
      <div>
        <h2>Heading</h2>
        <Heading {...props} />
      </div>
      <div>
        <h2>AsLink</h2>
        <AsLink {...props} />
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  args: { count: 8, siblingCount: 1, boundaryCount: 1 },
};
