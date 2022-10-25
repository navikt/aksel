import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPeopleDialogOutline = forwardRef(
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
          d="M14 3a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3.764L14 10.618V3Zm7 0h-5v4.382L16.764 7H21V3ZM7.5 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm0 12a4.5 4.5 0 1 1 9 0v.5h2v-.5a6.5 6.5 0 1 0-13 0v.5h2v-.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPeopleDialogOutline;
