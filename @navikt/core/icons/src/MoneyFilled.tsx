import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMoneyFilled = forwardRef(
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
          d="m6.3 4 11.2-4 1.2 4H6.3ZM2 6h18a2 2 0 0 1 2 2v2h-6a5 5 0 0 0 0 10h6v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm11 9a3 3 0 0 1 3-3h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-7a3 3 0 0 1-3-3Zm4.2 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMoneyFilled;
