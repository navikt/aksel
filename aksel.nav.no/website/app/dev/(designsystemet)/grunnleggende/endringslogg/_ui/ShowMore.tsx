"use client";

import cl from "clsx";
import React, {
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
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
  return <>{children}</>;
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
  children: ReactElement | (ReactElement | false | undefined | null)[];
}

const ShowMoreContent = ({
  collapsedHeight = "10rem",
  children,
}: ShowMoreContentProps) => {
  const { isExpanded } = useShowMoreContext();
  const inertValue = parseInt(version.split(".")[0]) > 18 ? true : ""; // Support for inert was added in React 19

  const childrenClone: ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (child && React.isValidElement(child)) {
      const props: any = child.props || {};
      const { className, ...restProps } = props;
      childrenClone.push(
        React.cloneElement(React.Children.only(child), {
          className: cl(
            styles.showMoreContainer,
            isExpanded ? styles.showMoreExpanded : styles.showMoreCollapsed,
            className,
          ),
          style: { maxHeight: isExpanded ? "fit-content" : collapsedHeight },
          inert: !isExpanded ? inertValue : false,
          ...restProps,
        }),
      );
    }
  });

  return childrenClone.length === 1 ? childrenClone[0] : childrenClone;
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
  // scrollTargetRef?: MutableRefObject<HTMLDivElement> | null;
  scrollTargetRef?: MutableRefObject<HTMLElement>;
}

/**
 * A component for partially hiding less important content.
 *
 * @example
 * ```jsx
 * <ShowMore>
 *   <ShowMore.Header>Optional heading text</ShowMore.Header>
 *   <ShowMore.Button><button>Toggle</button></ShowMore.Button>
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
        setShouldScroll(false);
      }
    }
  }, [shouldScroll, scrollBackOnCollapse, scrollTargetRef]);

  let heading, content, button;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      switch (child.type) {
        case ShowMoreHeading:
          heading = child;
          break;
        case ShowMoreContent:
          content = child;
          break;
        case ShowMoreButton:
          button = child;
          break;
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
        className={cl(
          styles.showMoreContainer,
          shouldFlash ? styles.highlightFlash : "",
          className,
        )}
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
