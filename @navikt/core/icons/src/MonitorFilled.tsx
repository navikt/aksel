import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMonitorFilled = forwardRef(
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
          d="M22 3H6v1h15v4h1V3Zm-1 11v-4h1v4h-1ZM2 1a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9v3H7a2 2 0 0 0-2 2h14a2 2 0 0 0-2-2h-4v-3h9a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMonitorFilled;
