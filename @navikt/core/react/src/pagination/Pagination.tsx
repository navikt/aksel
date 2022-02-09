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
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * Callback when current page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Total number of pages
   */
  count: number;
}

export const getSteps = ({
  page,
  count,
  boundaryCount = 1,
  siblingCount = 1,
}) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (count <= (boundaryCount + siblingCount) * 2 + 3) return range(1, count);

  const startPages = range(1, boundaryCount);
  const endPages = range(count - boundaryCount + 1, count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = siblingsStart + siblingCount * 2;

  return [
    ...startPages,
    siblingsStart - (startPages[startPages.length - 1] ?? 0) === 2
      ? siblingsStart - 1
      : "ellipsis",
    ...range(siblingsStart, siblingsEnd),
    (endPages[0] ?? count + 1) - siblingsEnd === 2
      ? siblingsEnd + 1
      : "ellipsis",
    ...endPages,
  ];
};
const Pagination = ({
  page,
  onPageChange,
  count,
  siblingCount,
  boundaryCount,
  className,
}: PaginationProps) => {
  return (
    <div className={cl("navds-pagination", className)}>
      <Button
        variant="tertiary"
        size="small"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Back aria-label="gå til forrige side" />
      </Button>
      {getSteps({ page, count, siblingCount, boundaryCount }).map((step) => {
        const n = Number(step);
        return isNaN(n) ? (
          <div className="navds-pagination__ellipsis" key={step}>
            <span>...</span>
          </div>
        ) : (
          <Button
            key={step}
            variant={page === n ? "primary" : "tertiary"}
            size="small"
            onClick={() => onPageChange(n)}
          >
            {n}
          </Button>
        );
      })}
      <Button
        variant="tertiary"
        size="small"
        disabled={page === count}
        onClick={() => onPageChange(page + 1)}
      >
        <Next aria-label="gå til neste side" />
      </Button>
    </div>
  );
};

export default Pagination;
