import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWashingFilled = forwardRef(
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
          d="M17 1a1 1 0 1 1 2 0v17h4v2h-.333l.894 2.684A1 1 0 0 1 22.613 24h-9.226a1 1 0 0 1-.948-1.316L13.333 20H13v-2h4V1ZM6 16a3.001 3.001 0 0 1-2.83-2H0v-2h12v2H8.829A3.001 3.001 0 0 1 6 16Zm-4.8-1.593.724 8.676A1 1 0 0 0 2.92 24h6.16a1 1 0 0 0 .996-.917l.723-8.677a5.002 5.002 0 0 1-9.598 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWashingFilled;
