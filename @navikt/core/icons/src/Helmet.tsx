import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHelmet = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="m13.996 6.006.004.045v5.95a1 1 0 1 0 2 0v-3.93A7.997 7.997 0 0 1 20.002 15v2.667l1 1.334h-18l1-1.334v-2.666A7.997 7.997 0 0 1 8 8.072v3.93a1 1 0 1 0 2 0v-5.95l.004-.045a1 1 0 0 1 .834-.896l.188-.031a6 6 0 0 1 1.949 0l.187.03a1 1 0 0 1 .834.896Zm8.006 8.996v2l1.8 2.4a1 1 0 0 1-.8 1.6h-22a1 1 0 0 1-.8-1.6l1.8-2.4v-2c0-4.105 2.473-7.632 6.01-9.173a3 3 0 0 1 2.5-2.692l.189-.03a8 8 0 0 1 2.598 0l.188.03a3 3 0 0 1 2.501 2.69 10.002 10.002 0 0 1 6.014 9.175Zm-11.002 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHelmet;
