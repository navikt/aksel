"use client";

import cl from "clsx";
import React, {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  version,
} from "react";
import styles from "./ShowMore.module.css";
import ShowMoreButton from "./ShowMoreButton";
import { ShowMoreContext, useShowMoreContext } from "./ShowMoreContext";

/* Heading */
const ShowMoreHeading = ({ children }) => {
  const { shouldFlash } = useShowMoreContext();
  const props: any = children.props || {};
  const { className, ...restProps } = props;

  return React.cloneElement(children, {
    className: cl(shouldFlash && styles.focusFlash, className),
    ...restProps,
  });
};

/* Content */
export interface ShowMoreContentProps
  extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * The height of the content area when it is collapsed/not expanded
   * @default 10rem
   */
  collapsedHeight?: `${number}${string}` | number;
  /**
   * Content. Is [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) when collapsed.
   */
  children: ReactNode;
}

const inertValue = parseInt(version.split(".")[0]) > 18 ? true : ""; // Support for inert was added in React 19

const ShowMoreContent = ({
  collapsedHeight = "10rem",
  children,
}: ShowMoreContentProps) => {
  const { isExpanded } = useShowMoreContext();

  if (Array.isArray(children)) {
    children = <div>{children}</div>;
  }

  if (children && React.isValidElement(children)) {
    const props: any = children.props || {};
    const { className, ...restProps } = props;
    return React.cloneElement(children, {
      className: cl(
        styles.showMoreContainer,
        isExpanded ? styles.showMoreExpanded : styles.showMoreCollapsed,
        className,
      ),
      style: {
        maxHeight: isExpanded ? "fit-content" : collapsedHeight,
      },
      inert: !isExpanded ? inertValue : false,
      ...restProps,
    });
  }
};

/* ShowMore component */
export interface ShowMoreProps
  extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * Override what element to render the wrapper as.
   * @default aside
   */
  as?: "aside" | "section" | "div";
  /**
   * ShowMore.Button, ShowMore.Heading and/or ShowMore.Content components.
   * ShowMore.Content is required.
   */
  children: ReactElement<
    typeof ShowMoreHeading | typeof ShowMoreContent | typeof ShowMoreButton
  >[];
  /**
   * Hide the collapse button after expanding to show the full content.
   * @default false
   */
  disallowCollapsing?: boolean;
  /**
   * Scroll the top of the content (or header if set) into view after collapsing.
   * @default true
   */
  scrollBackOnCollapse?: boolean;
  /**
   * Alternative target to scroll into view after collapsing.
   */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
}

/**
 * A component for partially hiding less important content.
 *
 * @example
 * ```jsx
 * <ShowMore>
 *   <ShowMore.Header>Optional heading text</ShowMore.Header>
 *   <ShowMore.Button><button className="styles.myButton" /></ShowMore.Button>
 *   <ShowMore.Content>The stuff to truncate or show fully</ShowMore.Content>
 * </ShowMore>
 * ```
 */
export const ShowMore = ({
  as: Component = "aside",
  children,
  className,
  disallowCollapsing = false,
  scrollBackOnCollapse = true,
  scrollTargetRef,
  ...restProps
}: ShowMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldFlash, setShouldFlash] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const internalScrollTargetRef = useRef(null);
  const contextValue = {
    isExpanded,
    setIsExpanded,
    shouldFlash,
    setShouldFlash,
    shouldScroll,
    setShouldScroll,
  };

  useEffect(() => {
    if (scrollBackOnCollapse && shouldScroll) {
      const scrollTarget =
        scrollTargetRef?.current || internalScrollTargetRef.current;
      if (
        scrollTarget &&
        scrollTarget.getBoundingClientRect().top <
          parseInt(getComputedStyle(scrollTarget).scrollMarginTop)
      ) {
        scrollTarget.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
        // eslint-disable-next-line
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShouldScroll(false);
      }
    }
  }, [shouldScroll, scrollBackOnCollapse, scrollTargetRef]);

  let heading: ReactNode;
  let content: ReactNode;
  let button: ReactNode;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (
        child.type === ShowMoreHeading ||
        (typeof child.type === "function" &&
          child.type.name === "ShowMoreHeading")
      ) {
        heading = child;
      } else if (
        child.type === ShowMoreContent ||
        (typeof child.type === "function" &&
          child.type.name === "ShowMoreContent")
      ) {
        content = child;
      } else if (
        child.type === ShowMoreButton ||
        (typeof child.type === "function" &&
          child.type.name === "ShowMoreButton")
      ) {
        button = child;
      }
    }
  });

  if (!content) {
    throw new Error("ShowMore.Content is required as a child of ShowMore.");
  }

  return (
    <ShowMoreContext.Provider value={contextValue}>
      <Component
        ref={internalScrollTargetRef}
        className={cl(styles.showMoreContainer, className)}
        {...restProps}
      >
        {heading}
        {!(isExpanded && disallowCollapsing) && button}
        {content}
      </Component>
    </ShowMoreContext.Provider>
  );
};

ShowMore.Heading = ShowMoreHeading;
ShowMore.Button = ShowMoreButton;
ShowMore.Content = ShowMoreContent;

export default ShowMore;
