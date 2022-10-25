import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgForward = forwardRef(
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
          d="M3 17v1h2v-1H3Zm17-7 .707.707.707-.707-.707-.707L20 10Zm-3.293-4.707L16 4.586 14.586 6l.707.707 1.414-1.414Zm-1.414 8-.707.707L16 15.414l.707-.707-1.414-1.414ZM5 17v-3H3v3h2Zm3-6h12V9H8v2Zm12.707-1.707-4-4-1.414 1.414 4 4 1.414-1.414Zm-1.414 0-4 4 1.414 1.414 4-4-1.414-1.414ZM5 14a3 3 0 0 1 3-3V9a5 5 0 0 0-5 5h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgForward;
