import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDeleteFilled = forwardRef(
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
          d="M7 5V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h5v2h-2.064l-.814 12.2A3 3 0 0 1 16.13 22H7.87a3 3 0 0 1-2.993-2.8L4.064 7H2V5h5Zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V4Zm0 5v9h2V9H9Zm4 0v9h2V9h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDeleteFilled;
