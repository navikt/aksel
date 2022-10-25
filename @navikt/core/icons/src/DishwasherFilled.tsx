import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDishwasherFilled = forwardRef(
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
          d="M3 1a1 1 0 0 0-1 1v3h20V2a1 1 0 0 0-1-1H3ZM2 12V7h20v5h-4a2 2 0 1 0-4 0h-2c0-.703.181-1.363.5-1.937A2.001 2.001 0 0 0 10 12H8c0-.703.181-1.363.5-1.937A2.001 2.001 0 0 0 6 12H2Zm-.613 2a1 1 0 0 0-.948 1.316l2.333 7a1 1 0 0 0 .949.684h16.558a1 1 0 0 0 .949-.684l2.333-7A1 1 0 0 0 22.613 14H1.387ZM15 18H9v-2h6v2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDishwasherFilled;
