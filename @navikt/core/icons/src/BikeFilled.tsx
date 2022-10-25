import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBikeFilled = forwardRef(
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
          d="M8.043 2.709A1 1 0 0 1 9 2h3a1 1 0 1 1 0 2H9.74L8.033 9.616a5.5 5.5 0 1 1-1.914-.582L8.043 2.71ZM5.5 11h.02l-.31 1.017a2.5 2.5 0 1 0 1.914.582l.31-1.017A3.5 3.5 0 1 1 5.5 11Zm13 6a2.5 2.5 0 0 0 .474-4.955l-.36-1.043a3.5 3.5 0 1 1-1.94.511l.338.978A2.5 2.5 0 0 0 18.5 17Zm-2.49-7.406a5.5 5.5 0 1 0 1.92-.565l-.713-2.065a.995.995 0 0 0-.365-.488A1 1 0 0 0 16 6h-5a1 1 0 1 0 0 2h4.46l.55 1.594Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBikeFilled;
