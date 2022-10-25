import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLoginFilled = forwardRef(
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
          d="M24 0H0v24h24V0ZM14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5v2h5a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3h-5v2Zm2.414 8-5.707-5.707-1.414 1.414L12.586 11H2v2h10.586l-3.293 3.293 1.414 1.414L16.414 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLoginFilled;
