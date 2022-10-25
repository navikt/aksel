import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPeopleDialogFilled = forwardRef(
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
          d="M23 3a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v7.618L17.236 9H21a2 2 0 0 0 2-2V3ZM7.5 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM1 22v-.5a6.5 6.5 0 1 1 13 0v.5H1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPeopleDialogFilled;
