import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgReceptionFilled = forwardRef(
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
          d="M21 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-7 8a4 4 0 0 1 8 0v1h-8v-1ZM4 15a4 4 0 0 1 8 0v7H4v-7Zm4-5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 6h10v6H14v-6ZM2 16H0v6h2v-6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgReceptionFilled;
