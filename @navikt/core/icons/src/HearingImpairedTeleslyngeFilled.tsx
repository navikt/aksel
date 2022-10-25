import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingImpairedTeleslyngeFilled = forwardRef(
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
          d="M9.378.043c-3.587-.397-6.78 1.977-7.64 5.299 2.794 3.067 3.498 8.82.14 12.512l.005.01L0 19.748 1.253 21l16.83-16.83-1.253-1.253-1.618 1.619A7.07 7.07 0 0 0 9.377.043ZM4.941 7.08c.017-2.434 2.366-4.178 4.702-3.477a3.648 3.648 0 0 1 2.42 2.356 1 1 0 0 1-1.9.626 1.648 1.648 0 0 0-1.095-1.067A1.654 1.654 0 0 0 6.94 7.09v.744c.119.086.245.19.372.317.507.507.957 1.31.957 2.479a1 1 0 1 1-2 0c0-.604-.214-.908-.372-1.065a1.079 1.079 0 0 0-.292-.207l-.665-.222V7.08Zm2.06 13.19c2.926.547 4.857-.803 5.647-3.15l2.151-7.376-9.744 9.744s.886.443 1.947.782ZM19 16h-3v-2h8v2h-3v8h-2v-8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingImpairedTeleslyngeFilled;
