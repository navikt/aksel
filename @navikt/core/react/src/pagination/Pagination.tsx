import React, { forwardRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import { AkselColor } from "../types";
import { BodyShort, Heading } from "../typography";
import { useI18n } from "../util/i18n/i18n.hooks";
import { useId } from "../utils-external";
import { cl } from "../utils/helpers";
import PaginationItem, {
  PaginationItemProps,
  PaginationItemType,
} from "./PaginationItem";

interface RenderItemProps
  extends Pick<
    PaginationItemProps,
    "className" | "disabled" | "selected" | "icon" | "iconPosition"
  > {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  page: number;
  size: Exclude<PaginationProps["size"], undefined>;
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current page.
   *
   * Pagination indexing starts at 1.
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
   * Callback when current page changes.
   */
  onPageChange?: (page: number) => void;
  /**
   * Total number of pages.
   */
  count: number;
  /**
   * Changes padding, height and font-size.
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
  /**
   * Display text alongside "previous" and "next" icons.
   * @default false
   */
  prevNextTexts?: boolean;
  /**
   * Override pagination item rendering.
   * @default PaginationItem
   */
  renderItem?: (item: RenderItemProps) => ReturnType<React.FC>;
  /**
   * Pagination heading. We recommend adding heading instead of `aria-label` to help assistive technologies with an extra navigation-stop.
   */
  srHeading?: {
    tag: "h2" | "h3" | "h4" | "h5" | "h6";
    text: string;
  };
  /**
   * Overrides color.
   *
   * We have disallowed status-colors.
   * @default "neutral"
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   * @private
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
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
}: Pick<
  PaginationProps,
  "page" | "count" | "boundaryCount" | "siblingCount"
>) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (count <= (boundaryCount + siblingCount) * 2 + 3) return range(1, count);

  const startPages = range(1, boundaryCount);
  const endPages = range(count - boundaryCount + 1, count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
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

/**
 * A component that displays pagination controls.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/pagination)
 * @see 🏷️ {@link PaginationProps}
 *
 * @example
 * ```jsx
 * <Pagination
 *   page={pageState}
 *   onPageChange={setPageState}
 *   count={9}
 *   boundaryCount={1}
 *   siblingCount={1}
 * />
 * ```
 */
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
      srHeading,
      "aria-labelledby": ariaLabelledBy,
      renderItem: Item = PaginationItem,
      "data-color": color = "neutral",
      ...rest
    },
    ref,
  ) => {
    const headingId = useId();
    const translate = useI18n("Pagination");

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
        data-color={color}
        aria-labelledby={
          srHeading ? cl(headingId, ariaLabelledBy) : ariaLabelledBy
        }
        className={cl(
          "aksel-pagination",
          `aksel-pagination--${size}`,
          className,
        )}
      >
        {srHeading && (
          <Heading
            size="xsmall"
            visuallyHidden
            as={srHeading.tag}
            id={headingId}
          >
            {srHeading.text}
          </Heading>
        )}
        <ul className="aksel-pagination__list">
          <li>
            <Item
              data-color={color}
              className={cl({
                "aksel-pagination--invisible": page === 1,
              })}
              disabled={page === 1}
              onClick={() => onPageChange?.(page - 1)}
              page={page - 1}
              size={size}
              icon={
                <ChevronLeftIcon
                  {...(prevNextTexts
                    ? { "aria-hidden": true }
                    : { title: translate("previous") })}
                />
              }
            >
              {prevNextTexts && translate("previous")}
            </Item>
          </li>
          {getSteps({ page, count, siblingCount, boundaryCount }).map(
            (step, i) => {
              const n = Number(step);
              return Number.isNaN(n) ? (
                <li className="aksel-pagination__ellipsis" key={`${step}${i}`}>
                  <BodyShort
                    size={size === "xsmall" ? "small" : size}
                    as="span"
                  >
                    ...
                  </BodyShort>
                </li>
              ) : (
                <li key={step}>
                  <Item
                    data-color={color}
                    /* Remember to update RenderItemProps if you make changes to props sent into Item */
                    onClick={() => onPageChange?.(n)}
                    selected={page === n}
                    page={n}
                    size={size}
                  >
                    {n}
                  </Item>
                </li>
              );
            },
          )}
          <li>
            <Item
              data-color={color}
              className={cl({
                "aksel-pagination--invisible": page === count,
              })}
              disabled={page === count}
              onClick={() => onPageChange?.(page + 1)}
              page={page + 1}
              size={size}
              icon={
                <ChevronRightIcon
                  {...(prevNextTexts
                    ? { "aria-hidden": true }
                    : { title: translate("next") })}
                />
              }
              iconPosition="right"
            >
              {prevNextTexts && translate("next")}
            </Item>
          </li>
        </ul>
      </nav>
    );
  },
) as PaginationType;

Pagination.Item = PaginationItem;

export default Pagination;
