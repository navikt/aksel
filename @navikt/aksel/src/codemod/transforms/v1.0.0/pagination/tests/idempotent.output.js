import { Pagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <Pagination
        size="small"
        onPageChange={setPage}
        data-version="v1"
        {...testProps}
      />
      <Pagination size="small" onPageChange={setPage} data-version="v1" />
      <Pagination size="xsmall" onPageChange={setPage} data-version="v1" />
      <Pagination size="small" onPageChange={setPage} data-version="v1" />
      <Pagination size="xsmall" onPageChange={setPage} data-version="v1" />
    </div>
  );
};
