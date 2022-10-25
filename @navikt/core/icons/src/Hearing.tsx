import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearing = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="M16.88.049C12.154-.474 8.033 3.264 8 7.989l2 .015c.025-3.564 3.135-6.36 6.66-5.97 3.802.421 6.243 4.241 5.024 7.863l-3.06 9.092a4.428 4.428 0 0 1-5.2 2.898l-.393-.092A3.915 3.915 0 0 1 10 17.983H8a5.913 5.913 0 0 0 4.578 5.758l.393.091a6.428 6.428 0 0 0 7.548-4.206l3.061-9.093C25.206 5.704 21.95.611 16.88.049Zm.262 4.143C14.588 3.427 12.018 5.332 12 7.99v2.724l.668.222.003.001a1.348 1.348 0 0 1 .372.262c.2.2.457.575.457 1.292 0 .726-.628 1.498-1.5 1.498a1 1 0 1 0 0 1.997c2.128 0 3.5-1.824 3.5-3.495 0-1.281-.493-2.155-1.043-2.704A3.37 3.37 0 0 0 14 9.405V8.001a1.996 1.996 0 0 1 2.567-1.896 1.99 1.99 0 0 1 1.32 2.529l-.837 2.546a1 1 0 0 0 1.9.623l.838-2.546a3.987 3.987 0 0 0-2.646-5.065Zm-13.85 2.1c.391-.39 1.025-.39 1.415 0a9.463 9.463 0 0 1 0 13.396c-.39.39-1.024.39-1.414 0a.998.998 0 0 1 0-1.412 7.468 7.468 0 0 0 0-10.572.998.998 0 0 1 0-1.412ZM1.708 9.288a1.001 1.001 0 0 0-1.414 0 .998.998 0 0 0 0 1.412 3.235 3.235 0 0 1 0 4.58.998.998 0 0 0 0 1.412c.39.39 1.024.39 1.414 0a5.23 5.23 0 0 0 0-7.404Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearing;
