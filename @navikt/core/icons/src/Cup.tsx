import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCup = forwardRef(
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
          d="M2 16V5h14v11a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4ZM0 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3.256a4.5 4.5 0 1 1 0 8.488V16a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V4Zm18 9.5a2.5 2.5 0 1 0 0-4v4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCup;
