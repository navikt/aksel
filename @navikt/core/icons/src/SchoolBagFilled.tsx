import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSchoolBagFilled = forwardRef(
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
          d="M10 2h4v1h-4V2ZM8 3.582V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.582A8.003 8.003 0 0 1 21 11v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-9a8.003 8.003 0 0 1 5-7.418ZM2 22v-9a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2Zm20-2v2a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2v7ZM9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 7h6v3H9v-3Zm-2 0a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSchoolBagFilled;
