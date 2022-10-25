import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDialogReport = forwardRef(
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
          d="M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H7l-7 5V4Zm21.994-.15A2 2 0 0 0 20 2l-16.15.005A2 2 0 0 0 2 4v16l4-3h14c1.035-.076 2-.946 2-2l-.006-11.15ZM10.5 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM11 4h2v6h-2V4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDialogReport;
