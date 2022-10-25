import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgStopWatchFilled = forwardRef(
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
          d="M13 2h2V0H9v2h2v2.05C5.947 4.55 2 8.814 2 14c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.185-3.947-9.449-9-9.95V2Zm9 5-3-3 1.414-1.414 3 3L22 7ZM9 18h2v-8H9v8Zm4 0h2v-8h-2v8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgStopWatchFilled;
