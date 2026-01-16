import React, { forwardRef, useContext } from "react";
import { useThemeInternal } from "../theme/Theme";
import { BodyLong } from "../typography";
import { cl } from "../util/className";
import { ExpansionCardContext } from "./context";

export interface ExpansionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardContent = forwardRef<
  HTMLDivElement,
  ExpansionCardContentProps
>(({ children, className, "data-color": dataColor, ...rest }, ref) => {
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
      {...rest}
      ref={ref}
      as="div"
      className={cl("aksel-expansioncard__content", className, {
        "aksel-expansioncard__content--closed": !panelContext.open,
      })}
      aria-hidden={!panelContext.open}
      size={panelContext.size}
      data-open={panelContext.open}
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

export default ExpansionCardContent;
