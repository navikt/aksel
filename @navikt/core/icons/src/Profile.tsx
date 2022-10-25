import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgProfile = forwardRef(
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
          d="M19 2H5v20h14V2ZM3 0v24h18V0H3Zm10 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 3c1.08 0 2.092.401 2.835 1.159.704.717 1.117 1.703 1.161 2.841H16v.205h-2c0-.758-.252-1.299-.593-1.646C13.065 12.21 12.577 12 12 12c-.578 0-1.065.21-1.407.56-.34.346-.593.887-.593 1.645H8V14h.004c.044-1.138.457-2.124 1.16-2.841C9.909 10.4 10.922 10 12 10Zm-5 7v2h10v-2H7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgProfile;
