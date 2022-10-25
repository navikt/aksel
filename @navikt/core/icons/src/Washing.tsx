import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWashing = forwardRef(
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
          d="M18 0a1 1 0 0 0-1 1v17h-4v2h.333l-.894 2.684A1 1 0 0 0 13.387 24h9.226a1 1 0 0 0 .948-1.316L22.667 20H23v-2h-4V1a1 1 0 0 0-1-1Zm2.558 20h-5.116l-.667 2h6.45l-.667-2ZM1.1 14c.028.138.062.273.1.406l.724 8.677A1 1 0 0 0 2.92 24h6.16a1 1 0 0 0 .996-.917l.723-8.676c.04-.134.073-.27.101-.407H12v-2H0v2h1.1Zm2.349 3.301L3.84 22h4.32l.391-4.699A4.977 4.977 0 0 1 6 18a4.977 4.977 0 0 1-2.551-.699Zm5.377-3.29a3.001 3.001 0 0 1-5.652 0V14h5.652v.01Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWashing;
