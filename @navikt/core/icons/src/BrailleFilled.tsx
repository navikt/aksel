import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBrailleFilled = forwardRef(
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
          d="M2 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm2 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-9-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm17-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-11 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm18-1a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBrailleFilled;
