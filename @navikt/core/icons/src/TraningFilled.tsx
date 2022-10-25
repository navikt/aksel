import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTraningFilled = forwardRef(
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
          d="M4 6.5a1.5 1.5 0 1 1 3 0V11h10V6.5a1.5 1.5 0 0 1 3 0v.585A1.5 1.5 0 0 1 22 8.5V11h2v2h-2v2.5a1.5 1.5 0 0 1-2 1.415v.585a1.5 1.5 0 0 1-3 0V13H7v4.5a1.5 1.5 0 0 1-3 0v-.585A1.5 1.5 0 0 1 2 15.5V13H0v-2h2V8.5a1.5 1.5 0 0 1 2-1.415V6.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTraningFilled;
