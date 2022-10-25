import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgProfileFilled = forwardRef(
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
          d="M3 0v24h18V0H3Zm9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c-1.08 0-2.092.401-2.835 1.159-.704.717-1.117 1.703-1.161 2.841h7.992c-.044-1.138-.457-2.124-1.16-2.841C14.091 10.4 13.078 10 12 10Zm-5 7v2h10v-2H7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgProfileFilled;
