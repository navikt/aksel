import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNoSmoking = forwardRef(
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
          d="M18 1.788c0 1.09.635 2.08 1.624 2.534V4.32a4.789 4.789 0 0 1 2.845 4.376V11h-2V8.697c0-1.09-.636-2.08-1.625-2.534A4.789 4.789 0 0 1 16 1.789V0h2v1.788ZM15.385 13 18 10.385 16.615 9 11 14.615 5.385 9 4 10.385 6.615 13H0v6h6.615L4 21.615 5.385 23 11 17.385 16.615 23 18 21.615 15.385 19H22a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-6.615Zm-2 2-1 1 1 1H19v-2h-5.615ZM22 17h-1v-2h1v2ZM8.615 17l1-1-1-1H2v2h6.615Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgNoSmoking;
