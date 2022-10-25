import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGlass = forwardRef(
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
          d="m6.252 6-.167-4h11.83l-.167 4H6.252Zm.083 2 .543 13.042a1 1 0 0 0 1 .958h8.244a1 1 0 0 0 1-.958L17.665 8H6.335ZM4.043 1.042a1 1 0 0 1 1-1.042h13.914a1 1 0 0 1 1 1.042l-.837 20.083A3 3 0 0 1 16.122 24H7.878a3 3 0 0 1-2.998-2.875L4.043 1.042Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGlass;
