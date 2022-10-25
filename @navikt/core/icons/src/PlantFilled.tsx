import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPlantFilled = forwardRef(
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
          d="M9.45 10.127c-.01.006-.008.004.004-.003l-.004.003ZM6 4.667c0 2.088 1.635 5.402 2.984 6.742A8.563 8.563 0 0 0 6 17.905v2.006c-2.076.44-3.982 1.802-5 4.089h13c-1.18-2.65-3.552-4.06-6-4.228v-1.866c0-2 .908-3.856 2.411-5.084C11.608 14.204 15.145 16 17.333 16 20 16 22 14.21 22 12s-1.721-4-4.667-4c-1.452 0-3.498.791-5.06 1.727C13.209 8.165 14 6.12 14 4.667 14 1.72 12.21 0 10 0S6 2 6 4.667Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPlantFilled;
