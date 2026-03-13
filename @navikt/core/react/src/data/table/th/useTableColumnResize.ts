import { type DOMAttributes, useCallback, useState } from "react";
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
      };
      isResizingWithKeyboard: boolean;
      enabled: true;
    }
  | {
      width: ColumnWidth | undefined;
      enabled: false;
    };

/**
 * TODO:
 * - Do we allow % widths? If so, need to get current width before updating when changing from cell
 *
 */
function useTableColumnResize(
  args: TableColumnResizeArgs,
): TableColumnResizeResult {
  const {
    width: userWidth,
    defaultWidth = 140,
    onWidthChange,
    maxWidth = Infinity,
    minWidth = 40,
    style,
  } = args;

  const tableContext = useDataTableContext();

  const [width, _setWidth] = useControllableState({
    value: userWidth,
    defaultValue: defaultWidth,
    /**
     * TODO:
     * - Potential optimization: Only call when width as "stopped" changing, e.g. on mouse up or after a debounce when resizing with keyboard.
     * Otherwise, this could cause excessive calls when resizing quickly.
     */
    onChange: onWidthChange,
  });

  const [isResizingWithKeyboard, setIsResizingWithKeyboard] = useState(false);
  const [, setIsResizingWithMouse] = useState(false);

  const setWidth = useCallback(
    (newWidth: number) => {
      const min = parseWidth(minWidth) ?? 0;
      const max = parseWidth(maxWidth) ?? Infinity;
      _setWidth(Math.min(Math.max(newWidth, min), max));
    },
    [maxWidth, minWidth, _setWidth],
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

export { useTableColumnResize };
export type { ResizeProps };
