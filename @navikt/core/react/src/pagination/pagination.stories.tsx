import React, { useState } from "react";
import Pagination from "./Pagination";

export default {
  title: "ds-react/pagination",
  component: Pagination,
};

export const All = (props) => {
  const [page, setPage] = useState(props.page);
  return (
    <div>
      <h2>Pagination</h2>
      <Pagination {...props} page={page} onPageChange={setPage} />

      <h2>Small</h2>
      <Pagination size="small" {...props} page={page} onPageChange={setPage} />

      <h2>xsmall</h2>
      <Pagination size="xsmall" {...props} page={page} onPageChange={setPage} />

      <h2>prevNextTexts</h2>
      <Pagination prevNextTexts {...props} page={page} onPageChange={setPage} />
      <h3>prevNextTexts small</h3>
      <Pagination
        prevNextTexts
        size="small"
        {...props}
        page={page}
        onPageChange={setPage}
      />
      <h3>prevNextTexts xsmall</h3>
      <Pagination
        prevNextTexts
        size="xsmall"
        {...props}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

All.args = {
  page: 1,
  count: 8,
  siblingCount: 1,
  boundaryCount: 1,
};
