import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEyeScreenedFilled = forwardRef(
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
          d="m22.207 3.207-3.674 3.674C20.453 8.046 22.275 9.752 24 12c-3.582 4.667-7.582 7-12 7-1.608 0-3.161-.31-4.658-.927l-4.135 4.134-1.414-1.414 3.674-3.674C3.547 15.954 1.725 14.248 0 12c3.582-4.667 7.582-7 12-7 1.608 0 3.161.31 4.658.927l4.135-4.134 1.414 1.414ZM12 17a5 5 0 0 0 4.172-7.757l-6.93 6.929c.791.523 1.739.828 2.758.828Zm-4.172-2.243 1.464-1.464a3 3 0 0 1 4.001-4.001l1.464-1.464a5 5 0 0 0-6.929 6.929Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEyeScreenedFilled;
