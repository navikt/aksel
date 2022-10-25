import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgOver18Filled = forwardRef(
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
          d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0c2.186 0 4.235.584 6 1.605V2h-2v4h2v2h4V6h.395A11.945 11.945 0 0 1 24 12Zm-9.5-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm2.45 4a3.5 3.5 0 1 0-4.899 0 3.5 3.5 0 1 0 4.899 0Zm-2.45 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM8.472 6.618A1 1 0 0 1 9 7.5V17a1 1 0 1 1-2 0V9.366a1 1 0 0 1-1.055-1.698l1.5-1a1 1 0 0 1 1.027-.05ZM19 5v2h2V5h2V3h-2V1h-2v2h-2v2h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgOver18Filled;
