import { Pagination as DsPagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <DsPagination onPageChange={setPage} />
      <DsPagination size="medium" onPageChange={setPage} />
      <DsPagination size="small" onPageChange={setPage} />
    </div>
  );
};
