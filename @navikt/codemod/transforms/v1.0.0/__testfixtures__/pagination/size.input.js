import { Pagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <Pagination {...props} page={page} onPageChange={setPage} />
      <Pagination size="medium" {...props} page={page} onPageChange={setPage} />
      <Pagination size="small" {...props} page={page} onPageChange={setPage} />
    </div>
  );
};
