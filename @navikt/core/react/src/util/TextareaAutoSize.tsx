/* https://github.com/mui/material-ui/blob/master/packages/mui-base/src/TextareaAutosize/TextareaAutosize.tsx */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useClientLayoutEffect } from "../util/hooks";
import debounce from "./debounce";
import { useMergeRefs } from "./hooks/useMergeRefs";
import { ownerWindow } from "./owner";

type State = {
  outerHeightStyle: number;
  overflow?: boolean | undefined;
};

const checkState = (
  prevState: State,
  newState: State,
  renders: React.MutableRefObject<number>,
) => {
  const { outerHeightStyle, overflow } = newState;
  // Need a large enough difference to update the height.
  // This prevents infinite rendering loop.
  if (
    renders.current < 20 &&
    ((outerHeightStyle > 0 &&
      Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
      prevState.overflow !== overflow)
  ) {
    renders.current += 1;
    return newState;
  }
  if (process.env.NODE_ENV !== "production" && renders.current === 20) {
    console.error(
      "Textarea: Too many re-renders. The layout is unstable. TextareaAutosize limits the number of renders to prevent an infinite loop.",
    );
  }
  return prevState;
};

function getStyleValue(value: string) {
  return parseInt(value, 10) || 0;
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
  /**
   * If true, textarea will never get `overflow:hidden`
   */
  autoScrollbar?: boolean;
}

const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  (
    {
      className,
      onChange,
      maxRows,
      minRows = 1,
      autoScrollbar,
      style,
      value,
      ...other
    }: TextareaAutosizeProps,
    ref,
  ) => {
    const { current: isControlled } = useRef(value != null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const handleRef = useMergeRefs(inputRef, ref);
    const shadowRef = useRef<HTMLTextAreaElement>(null);
    const renders = useRef(0);
    const [state, setState] = useState<State>({ outerHeightStyle: 0 });

    const getUpdatedState = React.useCallback(() => {
      const input = inputRef.current!;
      const containerWindow = ownerWindow(input);
      const computedStyle = containerWindow.getComputedStyle(input);

      // If input's width is shrunk and it's not visible, don't sync height.
      if (computedStyle.width === "0px") {
        return { outerHeightStyle: 0 };
      }

      const inputShallow = shadowRef.current!;
      inputShallow.style.width = computedStyle.width;
      inputShallow.value = input.value || other.placeholder || "x";
      if (inputShallow.value.slice(-1) === "\n") {
        // Certain fonts which overflow the line height will cause the textarea
        // to report a different scrollHeight depending on whether the last line
        // is empty. Make it non-empty to avoid this issue.
        inputShallow.value += " ";
      }

      const boxSizing = computedStyle.boxSizing;
      const padding =
        getStyleValue(computedStyle.paddingBottom) +
        getStyleValue(computedStyle.paddingTop);
      const border =
        getStyleValue(computedStyle.borderBottomWidth) +
        getStyleValue(computedStyle.borderTopWidth);

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

      return { outerHeightStyle, overflow };
    }, [maxRows, minRows, other.placeholder]);

    const syncHeight = () => {
      const newState = getUpdatedState();
      if (isEmpty(newState)) {
        return;
      }
      setState((prevState) => checkState(prevState, newState, renders));
    };

    useClientLayoutEffect(() => {
      const syncHeightWithFlushSync = () => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }

        // In React 18, state updates in a ResizeObserver's callback are happening after
        // the paint, this leads to an infinite rendering.
        // Using flushSync ensures that the state is updated before the next paint.
        // Related issue - https://github.com/facebook/react/issues/24331
        ReactDOM.flushSync(() => {
          setState((prevState) => checkState(prevState, newState, renders));
        });
      };

      const handleResize = debounce(
        () => {
          renders.current = 0;

          if (inputRef.current?.style.height || inputRef.current?.style.width) {
            // User has resized manually
            if (inputRef.current?.style.overflow === "hidden") {
              setState((oldState) => ({ ...oldState, overflow: false })); // The state update isn't important, we just need to trigger a rerender
            }
            return;
          }

          syncHeightWithFlushSync();
        },
        166,
        true,
      );

      const input = inputRef.current!;
      const containerWindow = ownerWindow(input);

      containerWindow.addEventListener("resize", handleResize);

      let resizeObserver: ResizeObserver;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(input);
      }

      return () => {
        handleResize.clear();
        containerWindow.removeEventListener("resize", handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [getUpdatedState]);

    useClientLayoutEffect(() => {
      syncHeight();
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: Since value is an external prop, we want to reset the renders on every time it changes, even when it is undefined or empty.
    useEffect(() => {
      renders.current = 0;
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      renders.current = 0;

      if (!isControlled) {
        syncHeight();
      }

      if (onChange) {
        onChange(event);
      }
    };

    const mainStyle: React.CSSProperties = {
      "--__axc-textarea-height": state.outerHeightStyle
        ? state.outerHeightStyle + "px"
        : "auto",
      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow:
        state.overflow &&
        !autoScrollbar &&
        !inputRef.current?.style.height &&
        !inputRef.current?.style.width
          ? "hidden"
          : undefined,
      ...style,
    };

    return (
      <>
        <textarea
          value={value}
          onChange={handleChange}
          ref={handleRef}
          // Apply the rows prop to get a "correct" first SSR paint
          rows={minRows}
          style={mainStyle}
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
  },
);

function isEmpty(obj: State) {
  return (
    obj === undefined ||
    obj === null ||
    Object.keys(obj).length === 0 ||
    (obj.outerHeightStyle === 0 && !obj.overflow)
  );
}

export default TextareaAutosize;
