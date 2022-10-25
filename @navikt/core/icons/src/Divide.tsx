import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDivide = forwardRef(
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
          d="M2 12c0-5.185 3.947-9.449 9-9.95v10.364l7.329 7.329A9.955 9.955 0 0 1 12 22C6.477 22 2 17.523 2 12Zm17.749 9.163A11.955 11.955 0 0 1 12 24C5.373 24 0 18.627 0 12 0 5.71 4.84.55 11 .041V0h2v.041C19.16.55 24 5.71 24 12c0 2.953-1.068 5.659-2.837 7.749l.03.03-.708.706-.707.707-.03-.029Zm-.006-2.834A9.956 9.956 0 0 0 22 12c0-5.185-3.947-9.449-9-9.95v9.536l6.743 6.743Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDivide;
