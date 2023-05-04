import { Pagination as DsPagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <DsPagination size="small" onPageChange={setPage} data-version="v1" />
      <DsPagination size="small" onPageChange={setPage} data-version="v1" />
      <DsPagination size="xsmall" onPageChange={setPage} data-version="v1" />
    </div>
  );
};
