import { Pagination as DsPagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <DsPagination size="small" onPageChange={setPage} />
      <DsPagination size="small" onPageChange={setPage} />
      <DsPagination size="xsmall" onPageChange={setPage} />
    </div>
  );
};
