import React, { forwardRef } from "react";
import cl from "classnames";
import { Back, Next } from "@navikt/ds-icons";
import { BodyShort } from "..";

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

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      onPageChange,
      count,
      boundaryCount = 1,
      siblingCount = 1,
      className,
      size = "medium",
      prevNextTexts = false,
      ...rest
    },
    ref
  ) => {
    if (page < 1) {
      console.error("page cannot be less than 1");
      return null;
    }
    if (count < 1) {
      console.error("count cannot be less than 1");
      return null;
    }
    if (boundaryCount < 0) {
      console.error("boundaryCount cannot be less than 0");
      return null;
    }
    if (siblingCount < 0) {
      console.error("siblingCount cannot be less than 0");
      return null;
    }

    return (
      <nav
        ref={ref}
        {...rest}
        className={cl(
          "navds-pagination",
          `navds-pagination--${size}`,
          className
        )}
      >
        {prevNextTexts && page !== 1 && (
          <button
            className="navds-pagination__prev-next"
            onClick={() => onPageChange(page - 1)}
          >
            <Back
              className="navds-pagination__prev-next-icon"
              role="presentation"
            />
            <BodyShort size={size} className="navds-pagination__prev-text">
              Forrige
            </BodyShort>
          </button>
        )}
        <ul className="navds-pagination__list">
          {!prevNextTexts && page !== 1 && (
            <li>
              <button
                className="navds-pagination__prev-next"
                onClick={() => onPageChange(page - 1)}
              >
                <Back
                  className="navds-pagination__prev-next-icon"
                  title="Forrige"
                />
              </button>
            </li>
          )}
          {getSteps({ page, count, siblingCount, boundaryCount }).map(
            (step, i) => {
              const n = Number(step);
              return isNaN(n) ? (
                <li className="navds-pagination__ellipsis" key={`${step}${i}`}>
                  <BodyShort size={size}>...</BodyShort>
                </li>
              ) : (
                <li key={step}>
                  <BodyShort
                    size={size}
                    as="button"
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
          {!prevNextTexts && page !== count && (
            <li>
              <button
                className="navds-pagination__prev-next"
                onClick={() => onPageChange(page + 1)}
              >
                <Next
                  className="navds-pagination__prev-next-icon"
                  title="Neste"
                />
              </button>
            </li>
          )}
        </ul>
        {prevNextTexts && page !== count && (
          <button
            className="navds-pagination__prev-next"
            onClick={() => onPageChange(page + 1)}
          >
            <BodyShort size={size} className="navds-pagination__next-text">
              Neste
            </BodyShort>
            <Next
              className="navds-pagination__prev-next-icon"
              role="presentation"
            />
          </button>
        )}
      </nav>
    );
  }
);

export default Pagination;
