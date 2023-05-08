import cl from "clsx";
import React, { forwardRef } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyShort } from "..";
import PaginationItem, {
  PaginationItemProps,
  PaginationItemType,
} from "./PaginationItem";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current page
   * @note Pagination indexing starts at 1
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
  onPageChange?: (page: number) => void;
  /**
   * Total number of pages
   */
  count: number;
  /**
   * Changes padding, height and font-size
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
  /**
   * Display text alongside "previous" and "next" icons
   * @default false
   */
  prevNextTexts?: boolean;
  /**
   * Override pagination item rendering
   * @default (item: PaginationItemProps) => <PaginationItem {...item} />
   */
  renderItem?: (item: PaginationItemProps) => ReturnType<React.FC>;
}

interface PaginationType
  extends React.ForwardRefExoticComponent<
    PaginationProps & React.RefAttributes<HTMLElement>
  > {
  Item: PaginationItemType;
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

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
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
      renderItem: Item = (item: PaginationItemProps) => (
        <PaginationItem {...item} />
      ),
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
        <ul className="navds-pagination__list">
          <li>
            <Item
              className={cl("navds-pagination__prev-next", {
                "navds-pagination--invisible": page === 1,
                "navds-pagination--prev-next--with-text": prevNextTexts,
              })}
              disabled={page === 1}
              onClick={() => onPageChange?.(page - 1)}
              page={page - 1}
              size={size}
              icon={
                <ChevronLeftIcon
                  className="navds-pagination__prev-next-icon"
                  {...(prevNextTexts
                    ? { "aria-hidden": true }
                    : { title: "Forrige" })}
                />
              }
            >
              {prevNextTexts && (
                <BodyShort
                  size={size === "xsmall" ? "small" : size}
                  className="navds-pagination__prev-text"
                >
                  Forrige
                </BodyShort>
              )}
            </Item>
          </li>
          {getSteps({ page, count, siblingCount, boundaryCount }).map(
            (step, i) => {
              const n = Number(step);
              return isNaN(n) ? (
                <li className="navds-pagination__ellipsis" key={`${step}${i}`}>
                  <BodyShort size={size === "xsmall" ? "small" : size}>
                    ...
                  </BodyShort>
                </li>
              ) : (
                <li key={step}>
                  <Item
                    onClick={() => onPageChange?.(n)}
                    selected={page === n}
                    page={n}
                    size={size}
                  >
                    <BodyShort size={size === "xsmall" ? "small" : size}>
                      {n}
                    </BodyShort>
                  </Item>
                </li>
              );
            }
          )}
          <li>
            <Item
              className={cl("navds-pagination__prev-next", {
                "navds-pagination--invisible": page === count,
                "navds-pagination--prev-next--with-text": prevNextTexts,
              })}
              disabled={page === count}
              onClick={() => onPageChange?.(page + 1)}
              page={page + 1}
              size={size}
              icon={
                <ChevronRightIcon
                  className="navds-pagination__prev-next-icon"
                  {...(prevNextTexts
                    ? { "aria-hidden": true }
                    : { title: "Neste" })}
                />
              }
              iconPosition="right"
            >
              {prevNextTexts && (
                <BodyShort
                  size={size === "xsmall" ? "small" : size}
                  className="navds-pagination__next-text"
                >
                  Neste
                </BodyShort>
              )}
            </Item>
          </li>
        </ul>
      </nav>
    );
  }
) as PaginationType;

Pagination.Item = PaginationItem;

export default Pagination;
