import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFindoutFilled = forwardRef(
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
        viewBox="0 0 25 25"
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
          d="M4.131 0h10.701l6.856 5.713v10.295c0 1.195-.37 2.304-1 3.22L25 23.538 23.54 25l-4.313-4.312c-.915.63-2.024 1-3.22 1H4.132V0Zm15.491 16.008a3.615 3.615 0 1 0-7.229 0 3.615 3.615 0 0 0 7.23 0ZM14.46 2.378v3.819h4.583l-4.583-3.82Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFindoutFilled;
