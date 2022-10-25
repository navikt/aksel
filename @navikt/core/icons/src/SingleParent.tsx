import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSingleParent = forwardRef(
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
          d="M9 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm10 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm2 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-23 4a6.5 6.5 0 1 1 13 0V24h-2v-7.5a4.5 4.5 0 1 0-9 0V24H0v-7.5Zm19.5.5a4.5 4.5 0 0 0-4.5 4.5V24h2v-2.5a2.5 2.5 0 0 1 5 0V24h2v-2.5a4.5 4.5 0 0 0-4.5-4.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSingleParent;
