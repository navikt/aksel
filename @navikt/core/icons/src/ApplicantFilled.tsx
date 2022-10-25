import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgApplicantFilled = forwardRef(
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
          d="M17 5A5 5 0 1 1 7 5a5 5 0 0 1 10 0Zm-4.13 12.275 5.13 1.62 5.13-1.62-4.49-3.741a1 1 0 0 0-1.28 0l-4.49 3.74ZM24 19.155l-6 1.848-6-1.849V23a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3.846ZM5 18a7 7 0 0 1 10.862-5.84L8.868 18H5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgApplicantFilled;
