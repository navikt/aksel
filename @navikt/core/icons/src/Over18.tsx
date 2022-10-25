import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgOver18 = forwardRef(
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
          d="M2 12C2 6.477 6.477 2 12 2c.947 0 1.862.131 2.728.376l.544-1.924A12.009 12.009 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-1.034-.131-2.04-.378-3l-1.937.5c.206.797.315 1.635.315 2.5 0 5.523-4.477 10-10 10S2 17.523 2 12Zm7-4.5a1 1 0 0 0-1.555-.832l-1.5 1A1 1 0 0 0 7 9.366V17a1 1 0 1 0 2 0V7.5Zm5.5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm2.45 4a3.5 3.5 0 1 0-4.899 0 3.5 3.5 0 1 0 4.899 0Zm-2.45 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM19 5h-2V3h2V1h2v2h2v2h-2v2h-2V5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgOver18;
