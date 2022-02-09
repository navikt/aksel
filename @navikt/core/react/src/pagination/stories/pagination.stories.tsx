import React, { useState } from "react";
import Pagination from "../Pagination";

export default {
  title: "ds-react/pagination",
  component: Pagination,
};

export const All = (props) => {
  const [page, setPage] = useState(props.page);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
};
All.args = {
  page: 1,
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};
