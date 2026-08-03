import React, { forwardRef } from "react";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";
import { useExpansionCardContext } from "../root/ExpansionCardRoot.context";

interface ExpansionCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link ExpansionCardDescriptionProps}
 */
const ExpansionCardDescription = forwardRef<
  HTMLParagraphElement,
  ExpansionCardDescriptionProps
>(({ className, ...rest }, ref) => {
  const panelContext = useExpansionCardContext();

  return (
    <BodyLong
      {...rest}
      as="p"
      ref={ref}
      className={cl("aksel-link-panel__description", className)}
      size={panelContext.size}
    />
  );
});

export { ExpansionCardDescription };
export type { ExpansionCardDescriptionProps };
