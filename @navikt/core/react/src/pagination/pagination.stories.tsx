/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Link, HashRouter as Router } from "react-router-dom";
import Pagination from "./Pagination";

export default {
  title: "ds-react/Pagination",
  component: Pagination,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small", "xsmall"],
      },
    },
  },
};

export const Default = {
  render: (props: any) => {
    const [page, setPage] = useState(props.page);
    return <Pagination {...props} page={page} onPageChange={setPage} />;
  },

  args: {
    page: 2,
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
    prevNextTexts: false,
  },
};

export const PrevNextText = () => {
  const [page, setPage] = useState(1);
  const props = {
    page: 1,
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  };
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

export const Small = () => {
  const [page, setPage] = useState(1);
  const props = {
    page: 1,
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  };
  return (
    <Pagination {...props} page={page} onPageChange={setPage} size="small" />
  );
};

export const XSmall = () => {
  const [page, setPage] = useState(1);
  const props = {
    page: 1,
    count: 8,
    siblingCount: 1,
    boundaryCount: 1,
  };
  return (
    <Pagination {...props} page={page} onPageChange={setPage} size="xsmall" />
  );
};

export const AsLink = {
  render: () => {
    const [page, setPage] = useState(1);
    const props = {
      page: 1,
      count: 8,
      siblingCount: 1,
      boundaryCount: 1,
    };
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

  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};
