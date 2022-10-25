import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFacilitetFilled = forwardRef(
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
          d="M9 4.235a2.647 2.647 0 0 0 2.647-2.647C11.647.887 12.12 0 12.821 0h4.12C17.526 0 18 .474 18 1.059v4.476a4 4 0 1 1 0 6.93v4.476c0 .585-.474 1.059-1.059 1.059h-4.476a4 4 0 1 1-6.93 0H1.06A1.059 1.059 0 0 1 0 16.941V1.06C0 .474.474 0 1.059 0h4.12c.701 0 1.174.887 1.174 1.588A2.647 2.647 0 0 0 9 4.235Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFacilitetFilled;
