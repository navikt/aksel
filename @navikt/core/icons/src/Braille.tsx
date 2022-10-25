import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBraille = forwardRef(
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
          d="M6 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm15 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-4 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-8-1a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 18a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm15 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBraille;
