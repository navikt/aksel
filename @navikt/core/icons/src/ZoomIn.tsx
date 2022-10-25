import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgZoomIn = forwardRef(
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
          d="M18 9a9 9 0 1 0-3.39 7.039L22.57 24 24 22.571l-7.961-7.962A8.962 8.962 0 0 0 18 9ZM2 9a7 7 0 1 1 14 0A7 7 0 0 1 2 9Zm8-5v4h4v2h-4v4H8v-4H4V8h4V4h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgZoomIn;
