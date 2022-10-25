import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCalenderFilled = forwardRef(
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
          d="M6 4V1a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0ZM2 3h2v1a3 3 0 0 0 6 0V3h4v1a3 3 0 1 0 6 0V3h2a2 2 0 0 1 2 2v5H0V5a2 2 0 0 1 2-2Zm-2 9h24v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V12Zm5 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H5Zm0 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H5Zm6-4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm2 4h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2Zm3-3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm4 4a1 1 0 0 0-1-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1ZM16 1v3a1 1 0 1 0 2 0V1a1 1 0 1 0-2 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCalenderFilled;
