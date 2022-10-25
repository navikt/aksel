import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDecision = forwardRef(
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
          d="M10.957 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm9.1 1.586a2 2 0 0 0-2.828 0L15.814 13a2 2 0 0 0 0 2.828l.872.872-4.579 4.578-.707.707 1.414 1.415.707-.708 4.579-4.578.95.95a2 2 0 0 0 2.828 0l1.414-1.415a2 2 0 0 0 0-2.828l-3.235-3.235ZM18.643 13l3.235 3.235-1.414 1.415-3.235-3.236L18.643 13ZM11 11c1.135 0 2.21.27 3.16.752l-1.559 1.51A5 5 0 0 0 6 18H4a7 7 0 0 1 7-7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDecision;
