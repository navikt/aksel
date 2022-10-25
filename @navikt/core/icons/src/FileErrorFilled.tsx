import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFileErrorFilled = forwardRef(
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
          d="M4 3a1 1 0 0 1 1-1h9v4a2 2 0 0 0 2 2h4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3Zm10.293 13.707a1 1 0 0 0 1.414-1.414L13.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L12 11.586 9.707 9.293a1 1 0 0 0-1.414 1.414L10.586 13l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 14.414l2.293 2.293Z"
          fill="currentColor"
        />
        <path
          d="M16 2v4h4a1 1 0 0 0-.293-.707l-3-3A1 1 0 0 0 16 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFileErrorFilled;
