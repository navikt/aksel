import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSandglassFilled = forwardRef(
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
          d="M12 11a5.001 5.001 0 0 1-4.584-3h9.168A5.001 5.001 0 0 1 12 11ZM5 0h14v6a6.996 6.996 0 0 1-3.392 6A6.996 6.996 0 0 1 19 18v6H5v-6a6.996 6.996 0 0 1 3.392-6A6.996 6.996 0 0 1 5 6V0Zm6 16v-2h2v2h-2Zm-4 4 5-3 5 3v2H7v-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSandglassFilled;
