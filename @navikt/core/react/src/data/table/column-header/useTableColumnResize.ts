import {
  type DOMAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useControllableState } from "../../../utils/hooks";
import { useDataTableContext } from "../root/DataTableRoot.context";

type ResizeProps = {
  // If/when we add support for composition, consider mentioning that resizing only works on first row in thead.
  /**
   * Whether the column should be resizable by the user.
   *
   * **NB:** This is always disabled when `layout="auto"` on the root component.
   * @default true
   */
  resizable?: boolean;
  /**
   * Whether the column should automatically resize to fit its content. **Runs only once.**
   *
   * `onWidthChange` will be called with the new size. `minWidth` and `maxWidth` will be respected.
   *
   * If you don't need manual resizing support and want most of the columns to resize automatically,
   * consider using `layout="auto"` on the root instead for better performance.
   *
   * **NB:** This can cause a layout shift. Set a good initial width with `width` or `defaultWidth` to mitigate this.
   */
  autoResizeOnce?: boolean;
  /**
   * Minimum width of the column when resizing. Only used when `resizable` or `autoResizeOnce` is enabled.
   * @default 40
   */
  resizeMin?: number;
  /**
   * Maximum width of the column when resizing. Only used when `resizable` or `autoResizeOnce` is enabled.
   */
  resizeMax?: number;
  // TODO: Consider "allowing" %-width on last column, if we find a solution to the overflow issue (width becomes 0px).
  /**
   * Controlled width of the column. (Does not respect `resizeMin` and `resizeMax`.)
   *
   * Should only be used to fully control column width state. Otherwise, use `default` and let the component handle resizing.
   *
   * **NB:** Percentage as initial width does not work well with resizing.
   */
  value?: number | string;
  /**
   * Initial width of the column. Only used when `value` is not set.
   * (Does not respect `resizeMin` and `resizeMax`.)
   *
   * **NB:** Percentage as initial width does not work well with resizing.
   * @default 140px
   */
  defaultValue?: number | string;
  /**
   * Called when the column width changes.
   * @param width New width in pixels.
   */
  onChange?: (width: number) => void;
};

type TableColumnResizeArgs = ResizeProps & {
  thRef: React.RefObject<HTMLTableCellElement | null>;
  colSpan: number | undefined;
};

type TableColumnResizeResult =
  | {
      width: number | string;
      resizeHandlerProps: {
        onMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"];
        onTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"];
        onKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"];
        onBlur: DOMAttributes<HTMLButtonElement>["onBlur"];
        onDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"];
        onClick: DOMAttributes<HTMLButtonElement>["onClick"];
      };
      isResizingWithKeyboard: boolean;
      enabled: true;
    }
  | {
      width?: number | string;
      enabled: false;
    };

/**
 * TODO:
 * - Auto-width mode is hard now since that might cause layout-shifts on mount. But would be preferable to
 * be able to set "1fr" or similar and have it fill remaining space.
 */
function useTableColumnResize({
  resizable = true,
  autoResizeOnce,
  resizeMin = 40,
  resizeMax = Infinity,
  value,
  defaultValue,
  onChange,
  thRef,
  colSpan,
}: TableColumnResizeArgs): TableColumnResizeResult {
  const tableContext = useDataTableContext();

  const [isResizingWithKeyboard, setIsResizingWithKeyboard] = useState(false);
  const ignoreNextOnClick = useRef(false);

  const [width, setWidth] = useControllableState({
    value,
    defaultValue: defaultValue ?? (colSpan ?? 1) * 140,
    /**
     * TODO:
     * - Potential optimization: Only call when width as "stopped" changing, e.g. on mouse up or after a debounce when resizing with keyboard.
     * Otherwise, this could cause excessive calls when resizing quickly.
     */
    onChange,
  });

  const setClampedWidth = useCallback(
    (newWidth: number) => {
      setWidth(Math.min(Math.max(newWidth, resizeMin), resizeMax));
    },
    [resizeMin, resizeMax, setWidth],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this on mount and when autoResizeOnce changes
  useEffect(
    function autoResizeColumn() {
      if (!autoResizeOnce) {
        return;
      }

      const newColumnWidth = getAutoColumnWidth(thRef);
      if (newColumnWidth) {
        setClampedWidth(newColumnWidth);
      }
    },
    [autoResizeOnce], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleOnClick: DOMAttributes<HTMLButtonElement>["onClick"] =
    useCallback(() => {
      // We need to use the onClick event in order to support screen readers properly,
      // since some of them only send a mouse click (no kbd events) when pressing enter/space.
      // We detect a "screen reader click" by checking if we had a mouseUp event right before.

      if (ignoreNextOnClick.current) {
        ignoreNextOnClick.current = false;
        return;
      }
      setIsResizingWithKeyboard((prev) => !prev);
    }, []);

  const handleKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"] =
    useCallback(
      (event) => {
        if (!isResizingWithKeyboard) {
          return;
        }
        const currentWidth = thRef.current?.offsetWidth ?? 0;

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const delta = event.key === "ArrowRight" ? 20 : -20;
          setClampedWidth(currentWidth + delta);
          return;
        }
        if (event.key === "Home") {
          event.preventDefault();
          setClampedWidth(0); // will fall back to minWidth
          return;
        }
        if (event.key === "End") {
          event.preventDefault();
          const newWidth = getAutoColumnWidth(thRef);
          if (newWidth && newWidth > currentWidth) {
            setClampedWidth(newWidth);
          }
          return;
        }
        if (event.key === "Escape") {
          setIsResizingWithKeyboard(false);
        }
      },
      [isResizingWithKeyboard, setClampedWidth, thRef],
    );

  const startResize = useCallback(
    (startX: number) => {
      const startWidth = thRef.current?.offsetWidth ?? 0;

      function onPointerMove(clientX: number) {
        const currentWidth = thRef.current?.offsetWidth ?? 0;
        const newWidth = startWidth + (clientX - startX);

        if (newWidth > resizeMax) {
          setWidth(newWidth < currentWidth ? newWidth : currentWidth);
          return;
        }
        if (newWidth < resizeMin) {
          setWidth(newWidth > currentWidth ? newWidth : currentWidth);
          return;
        }

        setClampedWidth(newWidth);
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
        setIsResizingWithKeyboard(false);

        // We only want onClick to trigger when using the keyboard
        // (we use onClick b.c. keyDown doesn't fire when using a screen reader)
        ignoreNextOnClick.current = true;
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("mouseup", cleanup, { once: true });
      document.addEventListener("touchend", cleanup, { once: true });
      document.addEventListener("touchcancel", cleanup, { once: true });
    },
    [resizeMax, resizeMin, setWidth, setClampedWidth, thRef],
  );

  const handleMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"] =
    useCallback(
      (event) => {
        startResize(event.clientX);
      },
      [startResize],
    );

  const handleTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"] =
    useCallback(
      (event) => {
        startResize(event.touches[0].clientX);
      },
      [startResize],
    );

  // Auto-size column to fit content on double click
  const handleDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"] =
    useCallback(() => {
      const newColumnWidth = getAutoColumnWidth(thRef);
      if (newColumnWidth) {
        setClampedWidth(newColumnWidth);
      }
    }, [setClampedWidth, thRef]);

  if (tableContext.layout !== "fixed") {
    return {
      enabled: false,
    };
  }

  if (!resizable) {
    return {
      width,

      enabled: false,
    };
  }

  return {
    width,
    resizeHandlerProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      onKeyDown: handleKeyDown,
      onBlur: () => setIsResizingWithKeyboard(false),
      onDoubleClick: handleDoubleClick,
      onClick: handleOnClick,
    },
    isResizingWithKeyboard,
    enabled: true,
  };
}

/**
 * Figures out how wide the column needs to be to fit all the content without truncation.
 */
function getAutoColumnWidth(
  thRef: React.RefObject<HTMLTableCellElement | null>,
) {
  const th = thRef.current!;
  const thContent = th.querySelector(".aksel-data-table__th-content");
  const thPaddingEl = th.querySelector(".aksel-data-table__cell-content");
  const rows = th.closest("table")?.querySelectorAll("tbody tr, tfoot tr");
  if (!thContent || !thPaddingEl || !rows) {
    return;
  }

  // Find needed width for header cell
  const range = document.createRange();
  range.selectNodeContents(thContent);
  const contentWidth = range.getBoundingClientRect().width;
  const paddingElStyle = window.getComputedStyle(thPaddingEl);
  const thInlinePadding =
    parseInt(paddingElStyle.paddingLeft, 10) +
    parseInt(paddingElStyle.paddingRight, 10);
  let newColumnWidth = contentWidth + thInlinePadding;

  // Find column position
  let columnPosition = 1;
  let prevSibling = th.previousElementSibling;
  while (prevSibling) {
    columnPosition += (prevSibling as HTMLTableCellElement).colSpan;
    prevSibling = prevSibling.previousElementSibling;
  }

  // Find needed width for each cell in column in tbody and tfoot
  let skipRows = 0;
  for (const row of rows) {
    // Skip rows where the cell in this column is covered by a rowspan from a previous row
    if (skipRows > 0) {
      skipRows--;
      continue;
    }

    // Find cell
    let cell = row.firstChild as HTMLTableCellElement;
    let currentPosition = cell.colSpan;
    while (columnPosition > currentPosition && cell.nextElementSibling) {
      cell = cell.nextElementSibling as HTMLTableCellElement;
      currentPosition += cell.colSpan;
    }
    skipRows = cell.rowSpan - 1;

    // Find needed width
    const cellContent = cell.querySelector(
      ".aksel-data-table__cell-content",
    ) as HTMLElement | null;

    if (!cellContent) {
      continue;
    }

    cellContent.style.width = "fit-content";
    const cellContentWidth = cellContent.scrollWidth;
    cellContent.style.removeProperty("width");
    let marginLeft = 0;
    if (cell.dataset.nested === "true") {
      const contentElStyle = window.getComputedStyle(cellContent);
      marginLeft = parseInt(contentElStyle.marginLeft, 10);
    }
    const widthNeededForThisCell =
      (cellContentWidth + marginLeft + 1) / cell.colSpan;
    if (widthNeededForThisCell > newColumnWidth) {
      newColumnWidth = Math.ceil(widthNeededForThisCell);
    }
  }

  // Make sure new width is not wider than the table container since that would be impractical
  const container = th.closest("div");
  const maxColWidth =
    (container?.offsetWidth || document.documentElement.clientWidth * 0.9) *
    0.95;

  return newColumnWidth > maxColWidth
    ? Math.floor(maxColWidth)
    : Math.ceil(newColumnWidth);
}

export { useTableColumnResize };
export type { ResizeProps };
