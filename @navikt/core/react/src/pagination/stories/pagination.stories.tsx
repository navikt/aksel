import React, { useState } from "react";
import Pagination from "../Pagination";

export default {
  title: "ds-react/pagination",
  component: Pagination,
};

export const All = ({ count }) => {
  const [page, setPage] = useState(0);
  return <Pagination page={page} onPageChange={setPage} count={count} />;
};
All.args = {
  count: 8,
};
