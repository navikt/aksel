import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPicture = forwardRef(
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
          d="M22 5H2v14h5.455L14 10l6.546 9H22V5Zm-1.964 16H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1.964Zm-1.963-2L14 13.4 9.928 19h8.145ZM7.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPicture;
