import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNorwegianFlagFilled = forwardRef(
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
          d="M2 3a2 2 0 0 0-2 2v3.5h6V3H2Zm6 0v7.5H0v2h8V21h2v-8.5h14v-2H10V3H8Zm4 0v5.5h12V5a2 2 0 0 0-2-2H12Zm12 11.5H12V21h10a2 2 0 0 0 2-2v-4.5ZM6 21v-6.5H0V19a2 2 0 0 0 2 2h4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgNorwegianFlagFilled;
