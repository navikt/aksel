import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingImpairedFilled = forwardRef(
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
          d="M12.88.049C8.83-.399 5.225 2.281 4.255 6.03c3.154 3.463 3.949 9.957.159 14.126l.004.012-2.125 2.125 1.414 1.414 19-19-1.414-1.414-1.828 1.827C18.435 2.458 16.002.395 12.88.05ZM8 7.993c.018-2.661 2.588-4.569 5.142-3.803a3.99 3.99 0 0 1 2.646 2.577 1 1 0 0 1-1.9.627 1.99 1.99 0 0 0-1.321-1.288A1.997 1.997 0 0 0 10 8.004v.906c.144.1.3.227.457.383.55.55 1.043 1.424 1.043 2.707a1 1 0 1 1-2 0c0-.717-.257-1.093-.457-1.293a1.348 1.348 0 0 0-.372-.263h-.003L8 10.22V7.993Zm2.197 14.89c3.303.617 5.483-.906 6.374-3.557L19 11 8 22s1 .5 2.197.883Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingImpairedFilled;
