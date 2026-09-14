import React, { forwardRef } from "react";
import { useThemeInternal } from "../../theme/Theme";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";
import { useExpansionCardContext } from "../root/ExpansionCardRoot.context";

interface ExpansionCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link ExpansionCardContentProps}
 */
const ExpansionCardContent = forwardRef<
  HTMLDivElement,
  ExpansionCardContentProps
>(({ children, className, "data-color": dataColor, ...rest }, ref) => {
  const panelContext = useExpansionCardContext();
  const themeContext = useThemeInternal();

  return (
    <BodyLong
      {...rest}
      ref={ref}
      as="div"
      className={cl("aksel-expansioncard__content", className)}
      size={panelContext.size}
    >
      <div
        className="aksel-expansioncard__content-inner"
        data-color={dataColor ?? themeContext?.color}
      >
        {children}
      </div>
    </BodyLong>
  );
});

export { ExpansionCardContent };
export type { ExpansionCardContentProps };
