import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGlassFilled = forwardRef(
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
          d="M4.043 1.042a1 1 0 0 1 1-1.042h13.914a1 1 0 0 1 1 1.042L19.708 7H4.292l-.249-5.958ZM4.375 9l.505 12.125A3 3 0 0 0 7.878 24h8.244a3 3 0 0 0 2.998-2.875L19.625 9H4.375Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGlassFilled;
