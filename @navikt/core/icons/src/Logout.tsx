import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLogout = forwardRef(
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
          d="m22.414 12-5.707 5.707-1.414-1.414L18.586 13H8v-2h10.586l-3.293-3.293 1.414-1.414L22.414 12ZM10 22H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h5v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLogout;
