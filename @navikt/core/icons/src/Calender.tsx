import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCalender = forwardRef(
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
          d="M6 7V5H2v5h20V5h-4v2a1 1 0 1 1-2 0V5H8v2a1 1 0 1 1-2 0Zm10-4H8V1a1 1 0 1 0-2 0v2H2a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4V1a1 1 0 1 0-2 0v2ZM2 12v10h20V12H2Zm6 3a1 1 0 0 0-1-1H5a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1Zm-1 3a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h2Zm6-4h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2Zm-2 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm9-3a1 1 0 0 0-1-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1Zm-4 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCalender;
