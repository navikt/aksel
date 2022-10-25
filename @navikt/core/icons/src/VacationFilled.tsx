import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgVacationFilled = forwardRef(
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
          d="m10.337 0 .56 1.966c6.022-1.45 11.468-.082 12.41 3.23L24 7.629 19.174 9.02l-1.243-.693-.688 1.25-3.861 1.115 2.113 8.316c4.236.153 7.693 2.259 8.38 4.991H6.125c.629-2.497 3.57-4.47 7.304-4.909l-1.977-7.84-3.861 1.115-1.242-.693-.689 1.251-4.826 1.394-.692-2.431c-.944-3.313 2.955-7.38 8.825-9.364L8.406.558 10.336 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgVacationFilled;
