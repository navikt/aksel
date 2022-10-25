import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgScaleFilled = forwardRef(
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
          d="M10 10a8 8 0 0 1 8-8h5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-5Zm11-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM0 13a2 2 0 0 0 2 2h7v-2H2v-3H0v3Zm1 9h4v-2H1v2Zm6 0v-2h4v2H7Zm6 0h4v-2h-4v2Zm10-2v2h-4v-2h4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgScaleFilled;
