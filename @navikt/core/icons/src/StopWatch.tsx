import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgStopWatch = forwardRef(
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
          d="M15 2h-2v2.05c5.053.501 9 4.765 9 9.95 0 5.523-4.477 10-10 10S2 19.523 2 14c0-5.185 3.947-9.449 9-9.95V2H9V0h6v2Zm5 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM19 4l3 3 1.414-1.414-3-3L19 4ZM9 10h2v8H9v-8Zm6 0h-2v8h2v-8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgStopWatch;
