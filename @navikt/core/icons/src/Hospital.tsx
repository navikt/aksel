import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHospital = forwardRef(
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
          d="M20 2H4v20h16V2Zm2 20V0H2v22H0v2h24v-2h-2ZM11 8H9V6h2V4h2v2h2v2h-2v2h-2V8Zm-5 4v2h2v-2H6Zm10 2v-2h2v2h-2Zm0 2v2h2v-2h-2Zm-5-2v-2h2v2h-2Zm-5 2v2h2v-2H6Zm5 2v-2h2v2h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHospital;
