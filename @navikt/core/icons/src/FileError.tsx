import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFileError = forwardRef(
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
          d="M15.707 16.707a1 1 0 0 1-1.414 0L12 14.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 13l-2.293-2.293a1 1 0 0 1 1.414-1.414L12 11.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 13l2.293 2.293a1 1 0 0 1 0 1.414Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 2a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-.293-.707l-3-3A1 1 0 0 0 16 2H5Zm1 18V4h8v2a2 2 0 0 0 2 2h2v12H6ZM17.586 6 16 4.414V6h1.586Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFileError;
