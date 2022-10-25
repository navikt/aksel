import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSingleParentFilled = forwardRef(
  (
    { title, titleId: _titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>
  ) => {
    let titleId: string | undefined = useId();
    titleId = title ? (_titleId ? _titleId : "title-" + titleId) : undefined;
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <circle cx={6.5} cy={4.5} r={4.5} fill="currentColor" />
        <circle cx={19.5} cy={12.5} r={3.5} fill="currentColor" />
        <path
          d="M0 16.5a6.5 6.5 0 1 1 13 0V24H0v-7.5ZM15 21.5a4.5 4.5 0 1 1 9 0V24h-9v-2.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSingleParentFilled;
