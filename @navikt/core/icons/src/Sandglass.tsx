import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSandglass = forwardRef(
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
          d="M17 2H7v4h10V2ZM7.416 8a5.001 5.001 0 0 0 9.168 0H7.416ZM19 6a6.996 6.996 0 0 1-3.392 6A6.996 6.996 0 0 1 19 18v6H5v-6a6.996 6.996 0 0 1 3.392-6A6.996 6.996 0 0 1 5 6V0h14v6Zm-2 12v1.857L12 17l-5 2.857V18a5 5 0 0 1 10 0Zm-5 1.303L16.719 22H7.28L12 19.303ZM11 14v2h2v-2h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSandglass;
