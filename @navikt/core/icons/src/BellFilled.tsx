import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBellFilled = forwardRef(
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
          d="M13 2v2.07c3.392.486 6 3.404 6 6.93v1.377c0 1.303.4 2.575 1.144 3.644l1.677 2.407A1 1 0 0 1 21 20h-6a3 3 0 1 1-6 0H3a1 1 0 0 1-.82-1.572l1.676-2.407A6.377 6.377 0 0 0 5 12.377V11a7.002 7.002 0 0 1 6-6.93V2h2Zm-2 18a1 1 0 1 0 2 0h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBellFilled;
