import cl from "clsx";
import React, { useEffect, useRef, useState, version } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button, type HeadingProps } from "@navikt/ds-react";

export interface ShowMoreProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * Override what element to render the wrapper as.
   * @default aside
   */
  as?: "aside" | "section" | "div";
  /**
   * Content. Is [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) when collapsed.
   */
  children: React.ReactNode;
  /**
   * Changes button size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Changes background color
   * @default "default"
   */
  variant?: "default" | "subtle" | "info";
  /**
   * Custom height of content when collapsed.
   * @default 10rem
   */
  collapsedHeight?: `${number}${string}` | number;
  /**
   * Heading text. Always available to screen readers.
   * Used as accessible label unless you define `aria-label` or `aria-labelledby`.
   */
  heading?: string;
  /**
   * Heading size
   * @default "medium"
   */
  headingSize?: HeadingProps["size"];
  /**
   * Heading level
   * @default "1"
   */
  headingLevel?: HeadingProps["level"];
  /**
   * Scroll back up to the component after collapsing.
   * @default true
   */
  scrollBackOnCollapse?: boolean;
}

/**
 * A component for partially hiding less important content.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/show-more)
 * @see 🏷️ {@link ShowMoreProps}
 *
 * @example
 * <ShowMore heading="Facts about toads">
 *   Toads have dry, leathery skin, short legs, and large bumps covering the parotoid glands.
 * </ShowMore>
 */
export const ShowMore =
  /*forwardRef<HTMLElement, ShowMoreProps>(*/
  (
    {
      as: Component = "aside",
      children,
      size = "medium",
      variant = "default",
      collapsedHeight = "10rem",
      /* heading,
      headingSize = "medium",
      headingLevel = "1", */
      scrollBackOnCollapse = true,
      className,
      //"aria-labelledby": ariaLabelledby,
      ...rest
    }: ShowMoreProps,
    /* ref, */
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    /* const mergedRef = useMemo(() => mergeRefs([localRef, ref]), [ref]); */
    const [shouldScroll, setShouldScroll] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    //const ariaLabelId = useId();

    useEffect(() => {
      if (localRef.current && shouldScroll) {
        localRef.current.scrollIntoView({ block: "nearest" });
        setShouldScroll(false);
      }
    }, [shouldScroll]);

    const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon;

    const inertValue = parseInt(version.split(".")[0]) > 18 ? true : ""; // Support for inert was added in React 19

    return (
      <Component
        ref={localRef}
        className={cl(
          "navds-show-more",
          `navds-show-more--${variant}`,
          className,
          { "navds-show-more--closed": !isOpen },
        )}
        //aria-labelledby={!ariaLabelledby && !rest["aria-label"] ? ariaLabelId : ariaLabelledby}
        {...rest}
      >
        {/* <Heading size={headingSize} level={headingLevel} id={ariaLabelId}>
          {heading}
        </Heading> */}

        <div className="navds-show-more__button-section">
          <div className="navds-show-more__button-wrapper">
            <Button
              type="button"
              variant="secondary-neutral"
              className="navds-show-more__button"
              icon={<ChevronIcon aria-hidden />}
              iconPosition="right"
              size={size}
              onClick={() => {
                setIsOpen(!isOpen);
                if (isOpen && scrollBackOnCollapse) {
                  setShouldScroll(true);
                }
              }}
            >
              {isOpen ? "Vis mindre" : "Vis mer"}
            </Button>
          </div>
        </div>

        <div
          className="navds-show-more__content"
          style={isOpen ? {} : { height: collapsedHeight }}
          // @ts-expect-error React 18 does not support inert
          inert={isOpen ? undefined : inertValue}
        >
          {children}
        </div>
      </Component>
    );
  };

export default ShowMore;

/**
 * Erfaringer med bruk:
 * - Skal heading være mandatory?
 * - Bleed teknikk for å fjerne padding fungerer ikke internt med ShowMore siden `overflow: hidden;`. Må legges rundt ShowMore
 *   Innholdet blir da "kuttet" når ShowMore er lukket (ser bra ut når den er åpen)
 */
