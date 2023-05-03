import cl from "clsx";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { Popover, PopoverProps, mergeRefs, useId } from "..";

const SvgQuestionmark = ({
  title,
  className,
  filled = false,
}: {
  title: string;
  className: string;
  filled?: boolean;
}) => {
  let titleId: string | undefined = useId();
  titleId = title ? `title-${titleId}` : undefined;
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      role="img"
      aria-labelledby={titleId}
      className={className}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <circle
        cx="12"
        cy="12"
        r="11"
        strokeWidth="2"
        stroke="currentColor"
        fill={filled ? "currentColor" : "transparent"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.25 9.5c0-.58.19-1.004.468-1.282S11.42 7.75 12 7.75c.58 0 1.004.19 1.282.468s.468.702.468 1.282c0 .158-.064.35-.25.61-.192.269-.457.537-.78.86l-.022.02c-.297.298-.647.648-.918 1.027-.282.395-.53.89-.53 1.483v.5a.75.75 0 0 0 1.5 0v-.5c0-.158.064-.35.25-.61.192-.269.457-.537.78-.86l.022-.02c.297-.298.647-.648.918-1.027.282-.395.53-.89.53-1.483 0-.92-.31-1.746-.907-2.343S12.92 6.25 12 6.25c-.92 0-1.746.31-2.343.907S8.75 8.58 8.75 9.5a.75.75 0 0 0 1.5 0Zm1.75 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        fill={filled ? "var(--a-surface-default)" : "currentColor"}
      />
    </svg>
  );
};

export interface HelpTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "strategy" | "placement"> {
  children: React.ReactNode;
  /**
   * Adds a title-tooltip with the given text
   * @default "hjelp"
   */
  title?: string;
  /**
   * Default dialog-placement on open
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
}

export const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
  (
    {
      className,
      children,
      placement = "top",
      strategy = "absolute",
      title = "hjelp",
      onClick,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);
    const [open, setOpen] = useState(false);

    return (
      <div className="navds-help-text">
        <button
          {...rest}
          ref={mergedRef}
          onClick={(e) => {
            setOpen((x) => !x);
            onClick?.(e);
          }}
          className={cl(className, "navds-help-text__button")}
          type="button"
          aria-expanded={open}
        >
          <SvgQuestionmark className="navds-help-text__icon" title={title} />
          <SvgQuestionmark
            className="navds-help-text__icon navds-help-text__icon--filled"
            filled
            title={title}
          />
        </button>
        <Popover
          onClose={() => setOpen(false)}
          className="navds-help-text__popover"
          open={open}
          anchorEl={buttonRef.current}
          placement={placement}
          strategy={strategy}
        >
          <Popover.Content className="navds-body-short">
            {children}
          </Popover.Content>
        </Popover>
      </div>
    );
  }
);

export default HelpText;
