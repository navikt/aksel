import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgScale = forwardRef(
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
          d="M22 4h-4a6 6 0 0 0-6 6v4h10V4Zm-4-2a8 8 0 0 0-8 8v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-4ZM2 15a2 2 0 0 1-2-2v-3h2v3h7v2H2Zm-1 7h4v-2H1v2Zm6 0v-2h4v2H7Zm6 0h4v-2h-4v2Zm10-2v2h-4v-2h4ZM19 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm2 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgScale;
