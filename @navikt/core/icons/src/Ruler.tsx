import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgRuler = forwardRef(
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
          d="m6 0 18 18V0H6Zm4.828 2L22 13.172V2H10.828ZM5.657 5.615 2.828 8.444l12.728 12.728 2.829-2.829L5.657 5.615Zm.707-2.121a1 1 0 0 0-1.414 0L0 8.444 15.556 24l4.95-4.95a1 1 0 0 0 0-1.414L6.364 3.494Zm-.707 4.95L7.07 7.029l1.414 1.415-1.414 1.414-1.414-1.414Zm4.242 1.414-1.414 1.414L9.9 12.686l1.415-1.414-1.415-1.414Zm4.243 7.07 1.414-1.413 1.415 1.414-1.415 1.414-1.414-1.414Zm-1.414-4.242-1.414 1.415 1.414 1.414 1.414-1.415-1.414-1.414ZM20 8l-4-4h4v4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgRuler;
