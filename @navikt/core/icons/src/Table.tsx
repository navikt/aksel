import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTable = forwardRef(
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
          d="M3.793 3.793A2.707 2.707 0 0 1 5.707 3h12.586A2.707 2.707 0 0 1 21 5.707v12.586A2.707 2.707 0 0 1 18.293 21H5.707A2.707 2.707 0 0 1 3 18.293V5.707c0-.718.285-1.406.793-1.914ZM5.707 5A.707.707 0 0 0 5 5.707V8.09h14V5.707A.707.707 0 0 0 18.293 5H5.707ZM19 10.089h-3V19h2.293a.707.707 0 0 0 .707-.707v-8.204ZM14 19v-8.911h-4V19h4Zm-6 0v-8.911H5v8.204a.707.707 0 0 0 .707.707H8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTable;
