import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmployerFilled = forwardRef(
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
          d="M12 14a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm1 10v-5h-2v5l-2.778-8.334A11.017 11.017 0 0 0 1.182 24H13Zm0 0 2.778-8.334A11.017 11.017 0 0 1 22.818 24H13Zm0-8v2h-2v-2h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEmployerFilled;
