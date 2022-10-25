import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPrinterRoomFilled = forwardRef(
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
          d="M18 7.027v5.169l2.47-1.544a1 1 0 1 1 1.06 1.696L18 14.554v2.642l2.47-1.544a1 1 0 1 1 1.06 1.696L18 19.554V23a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h9.91L5.005 1.887A1 1 0 1 1 5.927.113l11.519 5.992a1.004 1.004 0 0 1 .554.922ZM7 18a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPrinterRoomFilled;
