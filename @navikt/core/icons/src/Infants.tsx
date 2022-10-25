import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgInfants = forwardRef(
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
          d="M18 16v-5.392a7.034 7.034 0 0 1-1.352 1.626l.014.015-8.971 7.926A6 6 0 0 0 18 16ZM6.55 18.514A5.978 5.978 0 0 1 6 16v-5.392a6.998 6.998 0 0 0 5.668 3.384L6.55 18.514ZM4 8a8 8 0 1 1 16 0v8a8 8 0 1 1-16 0V8Zm3-1a5 5 0 1 1 10 0A5 5 0 0 1 7 7Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgInfants;
