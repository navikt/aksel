import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFilter2Filled = forwardRef(
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
          d="M0 3v1.175a1 1 0 0 0 .316.73l8.032 7.53v10.103a1 1 0 0 0 1.247.97l5.826-1.49a1 1 0 0 0 .753-.969v-8.614l7.533-7.533A1 1 0 0 0 24 4.194V3a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFilter2Filled;
