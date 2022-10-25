import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLinkFilled = forwardRef(
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
          d="M9.515 15.906a5.998 5.998 0 0 0 8.485 0l4.243-4.244a6.004 6.004 0 0 0 0-8.49l-1.415-1.414a5.998 5.998 0 0 0-8.485 0l-1.06 1.061a2.001 2.001 0 0 0 2.828 2.83l1.06-1.061a2 2 0 0 1 2.829 0l1.414 1.414a2.001 2.001 0 0 1 0 2.83l-4.242 4.244a2 2 0 0 1-2.829 0l-.707-.707a2 2 0 1 0-2.828 2.83l.707.707Z"
          fill="currentColor"
        />
        <path
          d="M14.485 8.094a5.998 5.998 0 0 0-8.485 0l-4.243 4.244a6.004 6.004 0 0 0 0 8.49l1.415 1.414a5.998 5.998 0 0 0 8.485 0l1.06-1.061a2.001 2.001 0 0 0-2.828-2.83l-1.06 1.061a2 2 0 0 1-2.829 0l-1.414-1.415a2.001 2.001 0 0 1 0-2.83l4.242-4.243a2 2 0 0 1 2.829 0l.707.707a2 2 0 1 0 2.828-2.83l-.707-.707Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLinkFilled;
