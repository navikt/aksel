import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDivideFilled = forwardRef(
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
          d="M11 12V.041C4.84.55 0 5.71 0 12c0 6.627 5.373 12 12 12 2.992 0 5.729-1.095 7.83-2.907L11 12Zm13 0a11.958 11.958 0 0 1-2.717 7.605L13 11V.041c5.277.435 9.585 4.285 10.712 9.334.189.845.288 1.723.288 2.625Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDivideFilled;
