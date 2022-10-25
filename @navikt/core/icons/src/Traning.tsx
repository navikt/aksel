import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTraning = forwardRef(
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
          d="M5 6a1 1 0 0 1 2 0v5h10V6a1 1 0 1 1 2 0v12a1 1 0 1 1-2 0v-5H7v5a1 1 0 1 1-2 0V6Zm-5 5h2V8a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0v-3H0v-2Zm22 0h2v2h-2v3a1 1 0 1 1-2 0V8a1 1 0 1 1 2 0v3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTraning;
