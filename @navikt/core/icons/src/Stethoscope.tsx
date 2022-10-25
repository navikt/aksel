import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgStethoscope = forwardRef(
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
          d="M3 2a1 1 0 0 0-1 1v6a4 4 0 0 0 8 0V3a1 1 0 0 0-1-1H7V0h2a3 3 0 0 1 3 3v6a6.002 6.002 0 0 1-5 5.917V21a1 1 0 1 0 2 0v-1.5a4.5 4.5 0 0 1 4.5-4.5h2.626A4.002 4.002 0 0 1 24 16a4 4 0 0 1-7.874 1H13.5a2.5 2.5 0 0 0-2.5 2.5V21a3 3 0 1 1-6 0v-6.083A6.002 6.002 0 0 1 0 9V3a3 3 0 0 1 3-3h2v2H3Zm17 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgStethoscope;
