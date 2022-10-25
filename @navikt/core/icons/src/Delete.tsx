import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDelete = forwardRef(
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
          d="M10 3a1 1 0 0 0-1 1v1h6V4a1 1 0 0 0-1-1h-4Zm7 2V4a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1H2v2h2.064l.814 12.2A3 3 0 0 0 7.87 22h8.258a3 3 0 0 0 2.993-2.8L19.936 7H22V5h-5Zm.931 2H6.07l.804 12.067a1 1 0 0 0 .998.933h8.258a1 1 0 0 0 .998-.933L17.93 7ZM9 18V9h2v9H9Zm4 0V9h2v9h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDelete;
