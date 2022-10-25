import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBagFilled = forwardRef(
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
          d="M14 3h-4a1 1 0 0 0-1 1v1h6V4a1 1 0 0 0-1-1ZM7 4v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10v-1a1 1 0 1 1 2 0v1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-6V4a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm4 11v1a1 1 0 1 0 2 0v-1h10v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6h10Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBagFilled;
