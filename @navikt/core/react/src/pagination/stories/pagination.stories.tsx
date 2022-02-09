import React, { useState } from "react";
import Pagination from "../Pagination";

export default {
  title: "ds-react/pagination",
  component: Pagination,
};

export const All = (props) => {
  const [page, setPage] = useState(1);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
};
All.args = {
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};
