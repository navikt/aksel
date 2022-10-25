import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSchoolBag = forwardRef(
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
          d="M10 2h4v1h-4V2ZM8 3.582V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.582A8.003 8.003 0 0 1 21 11v2h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1.535A3.998 3.998 0 0 1 17 24H7a3.998 3.998 0 0 1-3.465-2H2a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h1v-2a8.003 8.003 0 0 1 5-7.418ZM19 20v-9a6 6 0 0 0-6-6h-2a6 6 0 0 0-6 6v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Zm2-5v5h1v-5h-1ZM2 15h1v5H2v-5Zm13 0H9v3h6v-3Zm-6-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H9Zm0-5a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSchoolBag;
