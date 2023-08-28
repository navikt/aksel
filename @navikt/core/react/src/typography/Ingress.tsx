import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface IngressProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Ingress text
   */
  children: React.ReactNode;
  /**
   * Adds margin-bottom
   */
  spacing?: boolean;
}

/**
 * @deprecated Use `<BodyLong size="large" />`
 *
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link IngressProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 *     <Ingress>
 *       Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.
 *     </Ingress>
 * ```
 */
export const Ingress: OverridableComponent<IngressProps, HTMLParagraphElement> =
  forwardRef(({ className, spacing, as: Component = "p", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-ingress", {
        "navds-typo--spacing": !!spacing,
      })}
    />
  ));

export default Ingress;
