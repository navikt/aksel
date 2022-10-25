import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmail = forwardRef(
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
          d="M2 5h20v1.764l-10 5-10-5V5ZM0 5a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V5Zm2 4v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9l-10 5L2 9Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEmail;
