import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSystemFilled = forwardRef(
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
          d="M6 0H0v6h6V0Zm0 9H0v6h6V9Zm-6 9h6v6H0v-6ZM15 0H9v6h6V0ZM9 9h6v6H9V9Zm6 9H9v6h6v-6Zm3-18h6v6h-6V0Zm6 9h-6v6h6V9Zm-6 9h6v6h-6v-6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSystemFilled;
