import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBabyChangingRoom = forwardRef(
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
          d="M10 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm9.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3.18 7.155C3.365 6.474 3.982 6 4.687 6a5.472 5.472 0 0 1 4.882 3H13a1 1 0 1 1 0 2h-2.81l1.812 8H9.258v5h-2v-7h2.24l-1.426-6.296A3.471 3.471 0 0 0 5.02 8.016L2.608 17h2.65v7h-2v-5H0L3.18 7.155ZM19 11a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-1.382a2 2 0 0 1-1.789-1.106L14.382 14H14a1 1 0 1 1 0-2h.382a2 2 0 0 1 1.789 1.106l.447.894H18v-2a1 1 0 0 1 1-1Zm-5 6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBabyChangingRoom;
