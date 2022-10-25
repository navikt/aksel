import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCoApplicantFilled = forwardRef(
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
          d="M15 6A6 6 0 1 1 3 6a6 6 0 0 1 12 0ZM0 22v2h18v-2a9 9 0 1 0-18 0ZM19 7a3 3 0 0 0-3-3V2a5 5 0 0 1 2.378 9.4C21.694 12.55 24 16.047 24 20h-2c0-3.996-2.808-7-6-7v-3a3 3 0 0 0 3-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCoApplicantFilled;
