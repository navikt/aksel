import { type DOMAttributes, useCallback, useState } from "react";
import { useControllableState } from "../../../utils/hooks";
import { useDataTableContext } from "../root/DataTableRoot.context";

type ColumnWidth = number | string;

type ResizeProps = {
  ref: HTMLTableCellElement | null;
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
  /**
   * Forwarded colSpan
   */
  colSpan?: number;
};

type TableColumnResizeArgs = ResizeProps & {};

type TableColumnResizeResult =
  | {
      style?: React.CSSProperties;
      resizeHandlerProps: {
        onMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"];
        onTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"];
        onKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"];
        onBlur: DOMAttributes<HTMLButtonElement>["onBlur"];
        onDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"];
      };
      isResizingWithKeyboard: boolean;
      enabled: true;
    }
  | {
      style?: React.CSSProperties;
      enabled: false;
    };

/**
 * TODO:
 * - Do we allow % widths?
 * - Auto-width mode is hard now since that might cause layout-shifts on mount. But would be preferable to
 * be able to set "1fr" or similar and have it fill remaining space.
 */
function useTableColumnResize(
  args: TableColumnResizeArgs,
): TableColumnResizeResult {
  const {
    ref,
    width: userWidth,
    defaultWidth,
    onWidthChange,
    maxWidth = Infinity,
    minWidth = 40,
    style,
    colSpan,
  } = args;

  const tableContext = useDataTableContext();

  const [width, _setWidth] = useControllableState({
    value: userWidth,
    defaultValue: defaultWidth ?? (colSpan ?? 1) * 140,
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
      const currentWidth = ref?.offsetWidth;
      if (!currentWidth) {
        return;
      }

      const min = parseWidth(minWidth) ?? 0;
      const max = parseWidth(maxWidth) ?? Infinity;
      const clamped = Math.min(Math.max(newWidth, min), max);

      if (newWidth <= currentWidth && newWidth > max) {
        _setWidth(newWidth);
        return;
      }

      if (newWidth >= currentWidth && newWidth > max) {
        _setWidth(currentWidth);
        return;
      }

      _setWidth(clamped);
    },
    [minWidth, maxWidth, _setWidth, ref],
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

  const startResize = useCallback(
    (th: HTMLTableCellElement, startX: number) => {
      setIsResizingWithMouse(true);
      const startWidth = th.offsetWidth;

      function onPointerMove(clientX: number) {
        setWidth(startWidth + (clientX - startX));
      }

      function onMouseMove(e: MouseEvent) {
        onPointerMove(e.clientX);
      }

      function onTouchMove(e: TouchEvent) {
        e.preventDefault();
        onPointerMove(e.touches[0].clientX);
      }

      function cleanup() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onTouchMove);
        setIsResizingWithMouse(false);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("mouseup", cleanup, { once: true });
      document.addEventListener("touchend", cleanup, { once: true });
      document.addEventListener("touchcancel", cleanup, { once: true });
    },
    [setWidth],
  );

  const handleMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"] =
    useCallback(
      (event) => {
        const th = (event.target as HTMLElement).closest(
          "th",
        ) as HTMLTableCellElement;
        startResize(th, event.clientX);
      },
      [startResize],
    );

  const handleTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"] =
    useCallback(
      (event) => {
        const th = (event.target as HTMLElement).closest(
          "th",
        ) as HTMLTableCellElement;
        startResize(th, event.touches[0].clientX);
      },
      [startResize],
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

  if (tableContext.layout !== "fixed") {
    return {
      style,
      enabled: false,
    };
  }

  return {
    style: {
      ...style,
      width,
    },
    resizeHandlerProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
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

export { useTableColumnResize };
export type { ResizeProps };
