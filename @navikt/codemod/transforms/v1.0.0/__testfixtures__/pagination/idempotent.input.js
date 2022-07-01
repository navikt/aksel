import { Pagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <Pagination size="small" {...props} page={page} onPageChange={setPage} />
      <Pagination size="small" {...props} page={page} onPageChange={setPage} />
      <Pagination size="xsmall" {...props} page={page} onPageChange={setPage} />
    </div>
  );
};
