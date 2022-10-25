import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelfServiceFilled = forwardRef(
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
          d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6.127V7.973C15.873 5.714 13.998 4 11.831 4S7.788 5.714 7.788 7.973V11H2a2 2 0 0 1-2-2V2Zm13.873 5.973c0-1.09-.914-1.973-2.042-1.973-1.128 0-2.043.883-2.043 1.973v7.792l-1.454-.868c-.742-.443-1.911-.551-2.698.21-.82.793-.821 1.941-.154 2.768L10 24h8.5l1.491-7.063a3.295 3.295 0 0 0-2.88-3.497l-3.238-.306v-5.16Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelfServiceFilled;
