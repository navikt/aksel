import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCaseworkerFilled = forwardRef(
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
          d="M17 5.25a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Zm-5.338 6.361A7.389 7.389 0 0 0 4.272 19h10.165l3.65-3.65a7.386 7.386 0 0 0-6.425-3.739Zm10.686 5.041c-.87-.87-2.28-.87-3.15 0l-3.792 3.792L15 24l3.555-.407 3.793-3.792c.87-.87.87-2.28 0-3.149Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCaseworkerFilled;
