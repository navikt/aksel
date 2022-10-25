import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTooth = forwardRef(
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
          d="M2.1 5.884C1.48 2.844 3.802 0 6.904 0h.857c1.598 0 3.092.449 4.363 1.227A8.328 8.328 0 0 1 16.485 0h.857c3.102 0 5.424 2.845 4.802 5.884l-.669 3.27a9.377 9.377 0 0 1-3.01 5.18l-.477 3.826-.815 4.075a2.196 2.196 0 0 1-4.322-.083L12 16.844l-.851 5.308a2.196 2.196 0 0 1-4.322.083l-.815-4.075-.51-4.078A9.375 9.375 0 0 1 2.77 9.154l-.67-3.27ZM6.904 2A2.902 2.902 0 0 0 4.06 5.483l.67 3.27a7.377 7.377 0 0 0 2.377 4.086l.287.25.594 4.75.8 4.003a.196.196 0 0 0 .386-.007l.844-5.26c.046-.593.18-1.324.377-1.933.1-.306.232-.638.411-.914.132-.204.513-.728 1.194-.728.657 0 1.033.489 1.17.694.179.265.31.584.41.879.196.59.332 1.306.39 1.921l.856 5.341a.196.196 0 0 0 .386.007l.8-4.002.568-4.545.317-.254a7.38 7.38 0 0 0 2.619-4.288l.669-3.27A2.902 2.902 0 0 0 17.342 2h-.857a6.33 6.33 0 0 0-3.77 1.236l-.592.437-.594-.437A6.33 6.33 0 0 0 7.76 2h-.857Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTooth;
