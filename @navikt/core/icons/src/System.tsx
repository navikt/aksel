import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSystem = forwardRef(
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
          d="M4 0H0v4h4V0Zm0 10H0v4h4v-4ZM0 20h4v4H0v-4ZM14 0h-4v4h4V0Zm-4 10h4v4h-4v-4Zm4 10h-4v4h4v-4Zm6-20h4v4h-4V0Zm4 10h-4v4h4v-4Zm-4 10h4v4h-4v-4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSystem;
