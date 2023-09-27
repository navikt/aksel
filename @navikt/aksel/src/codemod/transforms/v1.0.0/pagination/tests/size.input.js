import { Pagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <Pagination onPageChange={setPage} />
      <Pagination size="medium" onPageChange={setPage} />
      <Pagination size="small" onPageChange={setPage} />
    </div>
  );
};
