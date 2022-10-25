import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSightlessFilled = forwardRef(
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
          d="M22.707 3.455 3.707 23l-1.414-1.455L6.128 17.6C3.968 16.396 1.926 14.536 0 12.02c3.69-4.823 7.812-7.235 12.364-7.235 1.781 0 3.496.369 5.145 1.107L21.293 2l1.414 1.455ZM9.472 8.566c-1.62 1.667-1.79 4.26-.512 6.12l1.402-1.441a2.901 2.901 0 0 1-.417-1.528c.007-.719.277-1.436.81-1.985a2.703 2.703 0 0 1 3.415-.405l1.252-1.287a4.541 4.541 0 0 0-5.95.526Zm12.235 1.061a1.05 1.05 0 0 0 0-1.455.98.98 0 0 0-1.414 0l-8 8.23a1.05 1.05 0 0 0 0 1.454.98.98 0 0 0 1.414 0l8-8.229Zm2 1.631a1.05 1.05 0 0 1 0 1.455l-4 4.115a.98.98 0 0 1-1.414 0 1.05 1.05 0 0 1 0-1.455l4-4.115a.98.98 0 0 1 1.414 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSightlessFilled;
