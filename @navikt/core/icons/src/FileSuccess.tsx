import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFileSuccess = forwardRef(
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
          d="M15.707 11.707a1 1 0 0 0-1.414-1.414L11 13.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 3a1 1 0 0 1 1-1h11a1 1 0 0 1 .707.293l3 3A1 1 0 0 1 20 6v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3Zm2 1v16h12V8h-2a2 2 0 0 1-2-2V4H6Zm10 .414L17.586 6H16V4.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFileSuccess;
