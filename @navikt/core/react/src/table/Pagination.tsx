import { Back, Next } from "@navikt/ds-icons";
import React from "react";
import { Button } from "..";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  count: number;
}

const Pagination = ({
  page,
  onPageChange,
  rowsPerPage,
  count,
}: PaginationProps) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <Button
      variant="secondary"
      disabled={page === 0}
      onClick={() => onPageChange(page - 1)}
    >
      <Back />
    </Button>
    {new Array(Math.ceil(count / rowsPerPage)).fill(null).map((_, i) => (
      <Button
        key={i}
        onClick={() => onPageChange(i)}
        variant={page === i ? "primary" : "secondary"}
      >
        {i + 1}
      </Button>
    ))}
    <Button
      variant="secondary"
      disabled={page === Math.ceil(count / rowsPerPage) - 1}
      onClick={() => onPageChange(page + 1)}
    >
      <Next />
    </Button>
  </div>
);

export default Pagination;
