import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEyeScreened = forwardRef(
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
          d="m18.533 6.88 3.674-3.673-1.414-1.414-4.135 4.134A12.092 12.092 0 0 0 12 5C7.582 5 3.582 7.333 0 12c1.725 2.248 3.547 3.954 5.467 5.12l-3.674 3.673 1.414 1.414 4.135-4.134C8.839 18.69 10.392 19 12 19c4.418 0 8.418-2.333 12-7-1.725-2.248-3.547-3.954-5.467-5.12Zm-3.433.606A10.06 10.06 0 0 0 12 7c-3.247 0-6.387 1.517-9.42 5 1.426 1.638 2.876 2.841 4.35 3.656l.898-.898a5.002 5.002 0 0 1 6.93-6.93l.342-.342Zm-1.806 1.806a3.001 3.001 0 0 0-4.002 4.002l4.002-4.002ZM8.9 16.514l8.17-8.17c1.474.815 2.924 2.018 4.35 3.656-3.033 3.483-6.173 5-9.42 5-1.044 0-2.078-.157-3.1-.486Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEyeScreened;
