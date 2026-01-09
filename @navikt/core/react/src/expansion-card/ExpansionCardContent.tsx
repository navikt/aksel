import React, { forwardRef, useContext } from "react";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import { BodyLong } from "../typography";
import { ExpansionCardContext } from "./context";

export interface ExpansionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardContent = forwardRef<
  HTMLDivElement,
  ExpansionCardContentProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  const panelContext = useContext(ExpansionCardContext);
  const themeContext = useThemeInternal();

  if (panelContext === null) {
    console.error(
      "<ExpansionCard.Content> has to be used within an <ExpansionCard>",
    );
    return null;
  }

  return (
    <BodyLong
      data-color={themeContext?.color}
      {...rest}
      ref={ref}
      as="div"
      className={cn("navds-expansioncard__content", className, {
        "navds-expansioncard__content--closed": !panelContext.open,
      })}
      aria-hidden={!panelContext.open}
      size={panelContext.size}
      data-open={panelContext.open}
    >
      <div
        className={cn("navds-expansioncard__content-inner")}
        data-color={themeContext?.color}
      >
        {children}
      </div>
    </BodyLong>
  );
});

export default ExpansionCardContent;
