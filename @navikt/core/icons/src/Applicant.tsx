import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgApplicant = forwardRef(
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
          d="M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2 0A5 5 0 1 1 7 5a5 5 0 0 1 10 0Zm1 10.603 2.517 2.098-2.517.755-2.517-.755L18 15.603Zm0 4.941 4-1.2V22h-8v-2.656l4 1.2Zm-6-2.076a1 1 0 0 1 .36-.768l5-4.166a1 1 0 0 1 1.28 0l5 4.166a1 1 0 0 1 .36.768V23a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1v-4.532ZM12 13a5 5 0 0 0-5 5H5a7 7 0 0 1 10.862-5.84l-1.632 1.364A4.98 4.98 0 0 0 12 13Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgApplicant;
