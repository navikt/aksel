import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLikeFilled = forwardRef(
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
          d="M10.582 1.804A2 2 0 0 1 12.185 1h1.254a2 2 0 0 1 1.96 2.4L14.462 8h6.537a3 3 0 0 1 2.913 3.715l-2.21 9a3 3 0 0 1-2.913 2.284h-8.58a4 4 0 0 1-1.65-.356l-2.601-1.178V8l4.624-6.196ZM3.972 8H0v15h3.972V8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLikeFilled;
