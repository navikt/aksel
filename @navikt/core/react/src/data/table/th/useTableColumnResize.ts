import { type DOMAttributes, useCallback, useState } from "react";
import { useClientLayoutEffect } from "../../../utils-external/hooks/useClientLayoutEffect";
import { useId } from "../../../utils-external/hooks/useId";
import { useControllableState } from "../../../utils/hooks";
import { useDataTableContext } from "../root/DataTableRoot.context";

type ColumnWidth = number | string;

type ResizeProps = {
  /**
   * Controlled width of the column.
   *
   * Should only be used to fully control column width state. Otherwise, use `defaultWidth` and let the component handle resizing.
   */
  width?: ColumnWidth;
  /**
   * Initial width of the column. Only used when `width` is not set.
   *
   * Supports fr units (e.g. `"1fr"`, `"2fr"`) for proportional distribution
   * of remaining space. Defaults to `"1fr"` when neither `width` nor
   * `defaultWidth` is provided.
   */
  defaultWidth?: ColumnWidth;
  /**
   * Minimum width of the column.
   *
   * Should be used in conjunction with `width` or `defaultWidth` to set limits when resizing.
   */
  minWidth?: ColumnWidth;
  /**
   * Maximum width of the column.
   *
   * Should be used in conjunction with `width` or `defaultWidth` to set limits when resizing.
   */
  maxWidth?: ColumnWidth;
  /**
   * Called when the column width changes.
   */
  onWidthChange?: (width: ColumnWidth) => void;
  /**
   * Forwarded styles
   */
  style?: React.CSSProperties;
};

type TableColumnResizeArgs = ResizeProps & {};

type TableColumnResizeResult =
  | {
      width: ColumnWidth | undefined;
      resizeHandlerProps: {
        onMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"];
        onTouchMove: DOMAttributes<HTMLButtonElement>["onTouchMove"];
        onKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"];
        onBlur: DOMAttributes<HTMLButtonElement>["onBlur"];
        onDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"];
      };
      isResizingWithKeyboard: boolean;
      enabled: true;
    }
  | {
      width: ColumnWidth | undefined;
      enabled: false;
    };

function useTableColumnResize(
  args: TableColumnResizeArgs,
): TableColumnResizeResult {
  const {
    width: userWidth,
    defaultWidth,
    onWidthChange,
    maxWidth = Infinity,
    minWidth = 40,
    style,
  } = args;

  const tableContext = useDataTableContext();
  const columnId = useId();

  const frConfig = parseFrValue(defaultWidth);
  const isFr =
    userWidth === undefined &&
    (frConfig !== undefined || defaultWidth === undefined);

  const [width, _setWidth] = useControllableState<ColumnWidth | undefined>({
    value: userWidth,
    defaultValue: isFr ? undefined : (parseWidth(defaultWidth) ?? 140),
    onChange: onWidthChange as
      | ((value: ColumnWidth | undefined) => void)
      | undefined,
  });

  const [isResizingWithKeyboard, setIsResizingWithKeyboard] = useState(false);
  const [, setIsResizingWithMouse] = useState(false);

  const setWidth = useCallback(
    (newWidth: number) => {
      const min = parseWidth(minWidth) ?? 0;
      const max = parseWidth(maxWidth) ?? Infinity;
      const clamped = Math.min(Math.max(newWidth, min), max);
      _setWidth(clamped);
      if (tableContext.layout === "fixed") {
        tableContext.notifyResize(columnId, clamped);
      }
    },
    [maxWidth, minWidth, _setWidth, tableContext, columnId],
  );

  const handleKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"] =
    useCallback(
      (event) => {
        if (event.key === "Enter" || event.key === " ") {
          setIsResizingWithKeyboard((prev) => !prev);
          return;
        }

        if (!isResizingWithKeyboard) {
          return;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();

          const th = (event.target as HTMLElement).closest(
            "th",
          ) as HTMLTableCellElement;
          const startWidth = th.offsetWidth;

          const delta = event.key === "ArrowRight" ? 20 : -20;
          setWidth(startWidth + delta);
        }
      },
      [isResizingWithKeyboard, setWidth],
    );

  const handleMouseDown: DOMAttributes<HTMLButtonElement>["onMouseMove"] =
    useCallback(
      (event) => {
        setIsResizingWithMouse(true);

        const th = (event.target as HTMLElement).closest(
          "th",
        ) as HTMLTableCellElement;

        const startX = event.clientX;
        const startWidth = th.offsetWidth;

        function onMouseMove(e: MouseEvent) {
          const newWidth = startWidth + (e.clientX - startX);
          setWidth(newWidth);
        }

        function cleanup() {
          document.removeEventListener("mousemove", onMouseMove);
          setIsResizingWithMouse(false);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", cleanup, { once: true });
      },
      [setWidth],
    );

  /**
   * TODO: Do we even want this?
   * - + 32px padding is hardcoded now, fix this
   * - Need to find widest element in column, not the header itself.
   * - Should doubleclick just reset to defaultWidth? Or add a autoWidth prop.
   */
  const handleDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"] =
    useCallback(
      (event) => {
        const th = (event.target as HTMLElement).closest(
          "th",
        ) as HTMLTableCellElement;

        const contentEl = th.getElementsByClassName(
          "aksel-data-table__th-content",
        )[0];
        const range = document.createRange();
        range.selectNodeContents(contentEl);
        const contentWidth = range.getBoundingClientRect().width;

        setWidth(contentWidth + 32);
      },
      [setWidth],
    );

  useClientLayoutEffect(() => {
    if (tableContext.layout !== "fixed") return;

    tableContext.registerColumn(columnId, {
      type: isFr ? "fr" : "fixed",
      frValue: frConfig ?? 1,
      fixedWidth: isFr ? 0 : (parseWidth(userWidth ?? defaultWidth) ?? 140),
      minWidth: parseWidth(minWidth) ?? 0,
      maxWidth: parseWidth(maxWidth) ?? Infinity,
      setResolvedWidth: (w) => _setWidth(w),
    });

    return () => tableContext.unregisterColumn(columnId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnId, tableContext.layout]);

  if (tableContext.layout !== "fixed") {
    return {
      width: style?.width,
      enabled: false,
    };
  }

  return {
    width,
    resizeHandlerProps: {
      onMouseDown: handleMouseDown,
      onTouchMove: () => {},
      onKeyDown: handleKeyDown,
      onBlur: () => setIsResizingWithKeyboard(false),
      onDoubleClick: handleDoubleClick,
    },
    isResizingWithKeyboard,
    enabled: true,
  };
}

function parseWidth(width: ColumnWidth | undefined): number | undefined {
  if (!width) {
    return undefined;
  }
  if (typeof width === "number") {
    return width;
  }
  if (typeof width === "string") {
    const parsed = parseInt(width, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function parseFrValue(width: ColumnWidth | undefined): number | undefined {
  if (typeof width !== "string") return undefined;
  const match = width.match(/^(\d+(?:\.\d+)?)fr$/);
  if (!match) return undefined;
  const value = Number(match[1]);
  return value > 0 ? value : undefined;
}

export { useTableColumnResize };
export type { ResizeProps };
