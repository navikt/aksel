import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPrint = forwardRef(
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
          d="M20 0v5a4 4 0 0 1 4 4v10h-4v5H4v-5H0V9a4 4 0 0 1 4-4V0h16Zm-2 12H6v10h12V12Zm-2 2v2H8v-2h8Zm-2 4v2H8v-2h6Zm6-11H4a2 2 0 0 0-1.995 1.85L2 9v8h2v-7h16v7h2V9a2 2 0 0 0-1.85-1.995L20 7Zm-2-5H6v3h12V2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPrint;
