import React from "react";
import cl from "classnames";
import { Back, Next } from "@navikt/ds-icons";
import { Button } from "..";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current page
   */
  page: number;
  /**
   * Callback when current page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Total number of pages
   */
  count: number;
}

export const getSteps = ({ current, count }) =>
  new Array(count)
    .fill(null)
    .map((_, i) => i)
    .filter((n) => {
      if (count < 8) {
        return true;
      }
      if (n === count - 1 || n === 0) {
        return true;
      }
      if (n >= current - 1 && n <= current + 1) {
        return true;
      }
      if (current <= 3 && n <= 4) {
        return true;
      }
      if (current >= count - 4 && n >= count - 5) {
        return true;
      }
      return false;
    });

const Pagination = ({
  page,
  onPageChange,
  count,
  className,
}: PaginationProps) => {
  return (
    <div className={cl("navds-pagination", className)}>
      <Button
        variant="tertiary"
        size="small"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <Back  aria-label="gå til forrige side"/>
      </Button>
      {getSteps({ current: page, count }).map((n, i, a) => (
        <>
          {i !== 0 && a[i - 1] !== n - 1 && (
            <div className="navds-pagination__ellipsis">
              <span>...</span>
            </div>
          )}
          <Button
            key={n}
            variant={page === n ? "primary" : "tertiary"}
            size="small"
            onClick={() => onPageChange(n)}
          >
            {n + 1}
          </Button>
        </>
      ))}
      <Button
        variant="tertiary"
        size="small"
        disabled={page === count - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <Next aria-label="gå til neste side"/>
      </Button>
    </div>
  );
};

export default Pagination;
