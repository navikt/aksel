import { Pagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <Pagination size="small" onPageChange={setPage} />
      <Pagination size="small" onPageChange={setPage} />
      <Pagination size="xsmall" onPageChange={setPage} />
    </div>
  );
};
