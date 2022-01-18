import { Back, Next } from "@navikt/ds-icons";
import React from "react";
import { Button } from "..";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  count: number;
}

export const getSteps = ({ current, stepCount }) =>
  new Array(stepCount)
    .fill(null)
    .map((_, i) => i)
    .filter((n) => {
      if (n === stepCount - 1 || n === 0) {
        return true;
      }
      if (n >= current - 1 && n <= current + 1) {
        return true;
      }
      if (current <= 2 && n === 2) {
        return true;
      }
      if (current >= stepCount - 3 && n === stepCount - 3) {
        return true;
      }
      return false;
    });

const Pagination = ({
  page,
  onPageChange,
  rowsPerPage,
  count,
}: PaginationProps) => {
  const stepCount = Math.ceil(count / rowsPerPage);

  return (
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
      {getSteps({ current: page, stepCount }).map((n, i, a) => (
        <>
          {i !== 0 && a[i - 1] !== n - 1 && <div>...</div>}
          <Button
            key={n}
            onClick={() => onPageChange(n)}
            variant={page === n ? "primary" : "secondary"}
          >
            {n + 1}
          </Button>
        </>
      ))}
      <Button
        variant="secondary"
        disabled={page === stepCount - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <Next />
      </Button>
    </div>
  );
};

export default Pagination;
