/* https://github.com/mui/material-ui/blob/master/packages/mui-base/src/TextareaAutosize/TextareaAutosize.js */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce, mergeRefs, useClientLayoutEffect } from "..";

/**
 * https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/ownerDocument.ts
 * https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/ownerWindow.ts
 */
const ownerWindow = (node: Node | null): Window => {
  const doc = (node && node.ownerDocument) || document;
  return doc.defaultView || window;
};

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

interface TextareaAutosizeProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "children" | "rows"
  > {
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: number;
}

const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  (
    { className, onChange, maxRows, minRows = 1, style, value, ...other },
    ref
  ) => {
    const { current: isControlled } = useRef(value != null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const handleRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const shadowRef = useRef<HTMLTextAreaElement | null>(null);
    const renders = useRef(0);
    const [state, setState] = useState<any>({});

    const syncHeight = useCallback(() => {
      if (!inputRef.current || !shadowRef.current) return;
      const input = inputRef.current;
      const containerWindow = ownerWindow(input);
      const computedStyle = containerWindow.getComputedStyle(input);

      // If input's width is shrunk and it's not visible, don't sync height.
      if (computedStyle.width === "0px") {
        return;
      }

      const inputShallow = shadowRef.current;
      inputShallow.style.width = computedStyle.width;
      inputShallow.value = input.value || other?.placeholder || "x";
      if (inputShallow.value.slice(-1) === "\n") {
        // Certain fonts which overflow the line height will cause the textarea
        // to report a different scrollHeight depending on whether the last line
        // is empty. Make it non-empty to avoid this issue.
        inputShallow.value += " ";
      }

      const boxSizing = computedStyle["box-sizing"];
      const padding =
        getStyleValue(computedStyle, "padding-bottom") +
        getStyleValue(computedStyle, "padding-top");
      const border =
        getStyleValue(computedStyle, "border-bottom-width") +
        getStyleValue(computedStyle, "border-top-width");

      // The height of the inner content
      const innerHeight = inputShallow.scrollHeight - padding;

      // Measure height of a textarea with a single row
      inputShallow.value = "x";
      const singleRowHeight = inputShallow.scrollHeight - padding;

      // The height of the outer content
      let outerHeight = innerHeight;

      if (minRows) {
        outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
      }
      if (maxRows) {
        outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
      }
      outerHeight = Math.max(outerHeight, singleRowHeight);

      // Take the box sizing into account for applying this value as a style.
      const outerHeightStyle =
        outerHeight + (boxSizing === "border-box" ? padding + border : 0);
      const overflow = Math.abs(outerHeight - innerHeight) <= 1;

      setState((prevState) => {
        // Need a large enough difference to update the height.
        // This prevents infinite rendering loop.
        if (
          renders.current < 20 &&
          ((outerHeightStyle > 0 &&
            Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) >
              1) ||
            prevState.overflow !== overflow)
        ) {
          renders.current += 1;
          return {
            overflow,
            outerHeightStyle,
          };
        }

        if (process.env.NODE_ENV !== "production") {
          if (renders.current === 20) {
            console.error(
              [
                "Textarea: Too many re-renders. The layout is unstable.",
                "TextareaAutosize limits the number of renders to prevent an infinite loop.",
              ].join("\n")
            );
          }
        }

        return prevState;
      });
    }, [maxRows, minRows, other?.placeholder]);

    useEffect(() => {
      const handleResize = debounce(() => {
        renders.current = 0;
        syncHeight();
      });
      const containerWindow = ownerWindow(inputRef.current);
      containerWindow.addEventListener("resize", handleResize);
      let resizeObserver;

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(inputRef.current);
      }

      return () => {
        handleResize.clear();
        containerWindow.removeEventListener("resize", handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [syncHeight]);

    useClientLayoutEffect(() => {
      syncHeight();
    });

    useEffect(() => {
      renders.current = 0;
    }, [value]);

    const handleChange = (event) => {
      renders.current = 0;

      if (!isControlled) {
        syncHeight();
      }

      if (onChange) {
        onChange(event);
      }
    };

    return (
      <>
        <textarea
          value={value}
          onChange={handleChange}
          ref={handleRef}
          // Apply the rows prop to get a "correct" first SSR paint
          rows={minRows}
          style={{
            height: state.outerHeightStyle,
            // Need a large enough difference to allow scrolling.
            // This prevents infinite rendering loop.
            ...(state.overflow ? { overflow: "hidden" } : {}),
            ...style,
          }}
          {...other}
          className={className}
        />
        <textarea
          aria-hidden
          className={className}
          readOnly
          ref={shadowRef}
          tabIndex={-1}
          style={{
            // Visibility needed to hide the extra text area on iPads
            visibility: "hidden",
            // Remove from the content flow
            position: "absolute",
            // Ignore the scrollbar width
            overflow: "hidden",
            height: 0,
            top: 0,
            left: 0,
            // Create a new layer, increase the isolation of the computed values
            transform: "translateZ(0)",
            ...style,
          }}
        />
      </>
    );
  }
);

export default TextareaAutosize;
