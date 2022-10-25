import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgUpDown = forwardRef(
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
          d="M11.999 5.957 5.997 0 0 5.953l1.409 1.42L4.997 3.81v11.192h2V3.81l3.593 3.566 1.409-1.42ZM12 18.043 18.003 24 24 18.047l-1.409-1.42-3.588 3.562V8.997h-2V20.19l-3.593-3.566-1.409 1.42Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgUpDown;
