import React from "react";
import cl from "classnames";
import { Back, Next } from "@navikt/ds-icons";
import { BodyShort, Button } from "..";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
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
  /**
   * Changes padding, height and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Display text alongside "previous" and "next" icons
   * @default false
   */
  prevNextTexts?: boolean;
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
  size = "medium",
  prevNextTexts = false,
}: PaginationProps) => {
  return (
    <nav
      className={cl("navds-pagination", `navds-pagination--${size}`, className)}
    >
      <ul className="navds-pagination__list">
        <li>
          <button
            className="navds-pagination__previous"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <Back
              className="navds-pagination__previous-icon"
              aria-label={prevNextTexts ? undefined : "Tilbake"}
              role={prevNextTexts ? "presentation" : undefined}
            />
            {prevNextTexts && <BodyShort size={size}>Tilbake</BodyShort>}
          </button>
        </li>
        {getSteps({ page, count, siblingCount, boundaryCount }).map(
          (step, i) => {
            const n = Number(step);
            return isNaN(n) ? (
              <li className="navds-pagination__ellipsis" key={`${step}${i}`}>
                <span>...</span>
              </li>
            ) : (
              <li>
                <BodyShort
                  size={size}
                  as="button"
                  key={step}
                  className="navds-pagination__item"
                  onClick={() => onPageChange(n)}
                  aria-current={page === n ? true : undefined}
                >
                  {n}
                </BodyShort>
              </li>
            );
          }
        )}
        <li>
          <button
            className="navds-pagination__next"
            disabled={page === count}
            onClick={() => onPageChange(page + 1)}
          >
            {prevNextTexts && <BodyShort size={size}>Neste</BodyShort>}
            <Next
              className="navds-pagination__next-icon"
              title={prevNextTexts ? undefined : "Neste"}
              role={prevNextTexts ? "presentation" : undefined}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
