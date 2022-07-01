import { Pagination as DsPagination, Button } from "@navikt/ds-react";

export const Demo = () => {
  return (
    <div>
      <DsPagination
        size="small"
        {...props}
        page={page}
        onPageChange={setPage}
      />
      <DsPagination
        size="small"
        {...props}
        page={page}
        onPageChange={setPage}
      />
      <DsPagination
        size="xsmall"
        {...props}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};
