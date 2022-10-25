import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgStrollerFilled = forwardRef(
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
          d="M9.5 17a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm9 0a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM16 0a8.001 8.001 0 0 1 7.938 6.999L24 7v3a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6V8.143C4 5.918 2.31 4.113.2 4.005L0 4V2c2.938 0 5.374 2.158 5.896 5L13.63 7V0H16Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgStrollerFilled;
