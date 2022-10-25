import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCaseworker = forwardRef(
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
          d="M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2 0A5 5 0 1 1 7 5a5 5 0 0 1 10 0Zm.1 8.938A7.389 7.389 0 0 0 4.328 19h2.11a5.278 5.278 0 0 1 9.168-3.568l1.494-1.494Zm-.212 7.539 4.011-4.011a.965.965 0 1 0-1.365-1.365l-4.01 4.01-.289 1.654 1.653-.288Zm.88 1.692 4.417-4.417a2.783 2.783 0 0 0-3.936-3.937l-4.418 4.418L13 24l4.767-.831Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCaseworker;
