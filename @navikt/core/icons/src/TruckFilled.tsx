import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTruckFilled = forwardRef(
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
          d="M0 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14h-3.027a4.5 4.5 0 0 0-8.946 0H1a1 1 0 0 1-1-1V4Zm16 10.758V6h3.859a2 2 0 0 1 1.722.983l1.863 3.153A4 4 0 0 1 24 12.17V17a1 1 0 0 1-1 1h-.027A4.5 4.5 0 0 0 16 14.758ZM9 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTruckFilled;
