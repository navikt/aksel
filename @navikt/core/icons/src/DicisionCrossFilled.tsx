import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDicisionCrossFilled = forwardRef(
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
          d="M17 5A5 5 0 1 1 7 5a5 5 0 0 1 10 0Zm-5 6a7 7 0 0 0-7 7h10.367l-2.682-3.449 3.185-2.385A6.967 6.967 0 0 0 12 11Zm3.26 4 3.023 3.886-3.023 3.886L16.84 24l2.71-3.485L22.26 24l1.579-1.228-3.022-3.886L23.839 15l-1.579-1.228-2.71 3.485-2.71-3.485L15.26 15Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDicisionCrossFilled;
