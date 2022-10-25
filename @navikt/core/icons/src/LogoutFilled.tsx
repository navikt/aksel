import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLogoutFilled = forwardRef(
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
          d="M24 0H0v24h24V0Zm-7.293 17.707L22.414 12l-5.707-5.707-1.414 1.414L18.586 11H8v2h10.586l-3.293 3.293 1.414 1.414ZM5 22h5v-2H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5V2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLogoutFilled;
