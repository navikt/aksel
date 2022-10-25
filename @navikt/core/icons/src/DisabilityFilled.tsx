import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDisabilityFilled = forwardRef(
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
          d="M1 1a1 1 0 0 1 1-1h2a3 3 0 0 1 3 3v4h9a3 3 0 0 1 3 3v5h3a1 1 0 1 1 0 2h-5v-7a1 1 0 0 0-1-1H5V3a1 1 0 0 0-1-1H2a1 1 0 0 1-1-1Zm14 16a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm4 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDisabilityFilled;
