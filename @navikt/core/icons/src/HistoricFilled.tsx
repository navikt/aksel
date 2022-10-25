import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHistoricFilled = forwardRef(
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
          d="M8 7 6 5l-.554-.554A9.96 9.96 0 0 1 12 2v10l8.5 7 .005-.013.767.63A11.954 11.954 0 0 0 24 12c0-6.627-5.373-12-12-12-3.06 0-5.852 1.145-7.97 3.03L3 2 1 0v7h7Zm-8 4v2h2v-2H0Zm1 7v-2h2v2H1Zm4 2v2h2v-2H5Zm6 4v-2h2v2h-2Zm6-2h2v-2h-2v2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHistoricFilled;
