import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDecisionCross = forwardRef(
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
          d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm6.444 8.886L15.42 15 17 13.772l2.71 3.485 2.711-3.485L24 15l-3.023 3.886L24 22.772 22.42 24l-2.71-3.485L17 24l-1.579-1.228 3.023-3.886Zm-4.31-5.41 1.701-1.333A7 7 0 0 0 5 18h2a5 5 0 0 1 7.135-4.522Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDecisionCross;
