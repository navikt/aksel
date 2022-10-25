import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShareFilled = forwardRef(
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
          d="m13.576 16.904 9.998-7.042a1 1 0 0 0 0-1.635l-9.998-7.043A1 1 0 0 0 12 2.002v3.186C3.463 6.34 0 14.874 0 22.293c0 .724 1.207.986 1.552.349 1.843-3.412 5.33-8.35 10.448-9.407v2.851a1 1 0 0 0 1.576.818Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgShareFilled;
