import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDialogReportFilled = forwardRef(
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
          d="M4 0a4 4 0 0 0-4 4v20l7-5h13a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm8 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-1-8h2v6h-2V4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDialogReportFilled;
