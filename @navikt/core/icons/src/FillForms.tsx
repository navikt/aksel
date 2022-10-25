import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFillForms = forwardRef(
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
          d="m18.013 1.109.03-.031c1.243-1.272 3.31-1.487 4.749-.254l.035.03.166.157.033.034c1.267 1.312 1.279 3.362.146 4.742l-1.486 1.807-7.525 9.162-7.21 3.264 1.875-7.744 6.356-7.737 1.201-1.462.068-.082 1.41-1.715.152-.171Zm-.032 3.171 1.394-1.696.096-.107c.561-.575 1.44-.632 2.022-.134l.098.092c.524.543.56 1.445.038 2.081L20.253 6.19l-2.272-1.91Zm-7.322 8.913 6.053-7.368 2.272 1.91-6.07 7.39-3.058 1.385.803-3.317ZM0 24h23.965v-2H0v2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFillForms;
