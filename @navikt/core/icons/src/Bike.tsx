import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBike = forwardRef(
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
          d="M8.043 2.709A1 1 0 0 1 9 2h3a1 1 0 1 1 0 2H9.74L8.033 9.616a5.5 5.5 0 1 1-1.914-.582L8.043 2.71ZM4.834 13.252 5.52 11H5.5a3.5 3.5 0 1 0 1.933.582l-.685 2.252a1 1 0 0 1-1.914-.582ZM22 14.5a3.5 3.5 0 1 1-5.326-2.987l.952 2.754a1 1 0 0 0 1.89-.654l-.903-2.611A3.5 3.5 0 0 1 22 14.5Zm-4.069-5.47a5.5 5.5 0 1 1-1.92.565L15.458 8H11a1 1 0 1 1 0-2h5a1 1 0 0 1 .852.476.995.995 0 0 1 .365.488l.714 2.065Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBike;
