import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMeetingRoom = forwardRef(
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
          d="M4 3a1 1 0 0 0-1 1H1a3 3 0 0 1 6 0H5a1 1 0 0 0-1-1Zm0 18a1 1 0 0 1-1-1H1a3 3 0 1 0 6 0H5a1 1 0 0 1-1 1Zm7-17a1 1 0 1 1 2 0h2a3 3 0 1 0-6 0h2Zm1 17a1 1 0 0 1-1-1H9a3 3 0 1 0 6 0h-2a1 1 0 0 1-1 1Zm7-17a1 1 0 1 1 2 0h2a3 3 0 1 0-6 0h2Zm1 17a1 1 0 0 1-1-1h-2a3 3 0 1 0 6 0h-2a1 1 0 0 1-1 1ZM2 16V8h20v8H2ZM0 7a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMeetingRoom;
