import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong } from "../typography";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
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
  const localRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(localRef, ref);

  useEffect(() => {
    if (!localRef.current) return;

    if (!panelContext.open) {
      // @ts-expect-error - "until-found" is not supported in all browsers yet
      localRef.current.hidden = "until-found";
    }
  }, [panelContext.open]);

  useEffect(() => {
    if (!localRef.current) return;

    // @ts-expect-error - onbeforematch is not supported in all browsers yet
    localRef.current.onbeforematch = () => {
      console.warn("before match");
      panelContext.toggleOpen();
    };
    // TODO: do we need cleanup?
  }, [panelContext]);

  if (panelContext === null) {
    console.error(
      "<ExpansionCard.Content> has to be used within an <ExpansionCard>",
    );
    return null;
  }

  return (
    <BodyLong
      {...rest}
      ref={mergedRef}
      as="div"
      className={cn("navds-expansioncard__content", className, {
        "navds-expansioncard__content--closed": !panelContext.open,
      })}
      aria-hidden={!panelContext.open}
      size={panelContext.size}
      data-open={panelContext.open}
      hidden={!panelContext.open}
    >
      <div className={cn("navds-expansioncard__content-inner")}>{children}</div>
    </BodyLong>
  );
});

export default ExpansionCardContent;
