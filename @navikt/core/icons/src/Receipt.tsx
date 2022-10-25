import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgReceipt = forwardRef(
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
          d="M19 0v24H5V0l3 2 2-2 2 2 2-2 2 2 3-2Zm-5 2.829-2 2-2-2-1.745 1.745L7 3.737V22h10V3.737l-1.255.837L14 2.829ZM12 18v2H9v-2h3Zm3-4v2H9v-2h6Zm-2-4v2H9v-2h4Zm2-4v2H9V6h6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgReceipt;
