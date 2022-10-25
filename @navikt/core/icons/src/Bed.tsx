import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBed = forwardRef(
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
          d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1 2 2v10h-2v-4H2v4H0V12a2 2 0 0 1 2-2V4Zm0 12h20v-4H2v4ZM20 4v6a4 4 0 0 0-4-4h-1a3.99 3.99 0 0 0-3 1.354A3.99 3.99 0 0 0 9 6H8a4 4 0 0 0-4 4V4h16Zm-4 4a2 2 0 0 1 2 2h-5a2 2 0 0 1 2-2h1ZM9 8a2 2 0 0 1 2 2H6a2 2 0 0 1 2-2h1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBed;
