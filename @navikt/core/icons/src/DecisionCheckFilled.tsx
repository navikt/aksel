import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDecisionCheckFilled = forwardRef(
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 5A5 5 0 1 1 7 5a5 5 0 0 1 10 0Zm-5 6a7 7 0 0 0-7 7h9.305l3.662-3.662A6.996 6.996 0 0 0 12 11Zm9.293 2.793-7.21 7.21-1.302-1.628-1.562 1.25 2.698 3.372 8.79-8.79-1.414-1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDecisionCheckFilled;
