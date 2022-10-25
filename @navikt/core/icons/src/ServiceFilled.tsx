import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgServiceFilled = forwardRef(
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
          d="M19 7a7 7 0 0 1-12.765 3.972A1.003 1.003 0 0 1 6 11H4a2 2 0 0 1-2-2V5a1 1 0 0 1 2 0v4h1.29A7 7 0 1 1 19 7Zm4 17c-1.26-5.176-5.708-9-11-9s-9.74 3.824-11 9h22ZM22 5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V5ZM8 10a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgServiceFilled;
