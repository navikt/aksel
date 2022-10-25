import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDirectionSign = forwardRef(
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
          d="M13 1v3h6.465a1 1 0 0 1 .832.445L24 10l-3.703 5.555a1 1 0 0 1-.832.445H13v8h-2v-8H.934a.5.5 0 0 1-.416-.777L4 10 .518 4.777A.5.5 0 0 1 .934 4H11V1a1 1 0 1 1 2 0ZM3.737 6l2.667 4-2.667 4H18.93l2.666-4-2.666-4H3.737Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDirectionSign;
