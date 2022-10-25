import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgRulerFilled = forwardRef(
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
          d="M24 0H6l18 18V0Zm-5.172 4H16l2 2 2 2V4h-1.172ZM4.95 3.494a1 1 0 0 1 1.414 0l2.121 2.121-2.828 2.829L7.07 9.858 9.9 7.029l1.414 1.415-2.829 2.828L9.9 12.686l2.829-2.828 1.414 1.414-2.828 2.829 1.414 1.414 2.828-2.829 1.415 1.415-2.829 2.828 1.414 1.414 2.829-2.828 2.121 2.121a1 1 0 0 1 0 1.414L15.556 24 0 8.444l4.95-4.95Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgRulerFilled;
