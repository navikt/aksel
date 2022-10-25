import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmployer = forwardRef(
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
          d="M17 7A5 5 0 1 1 7 7a5 5 0 0 1 10 0Zm2 0A7 7 0 1 1 5 7a7 7 0 0 1 14 0Zm-6 17v-5h-2v5l-2.778-8.334A11.011 11.011 0 0 0 1.182 24h2.041a9.012 9.012 0 0 1 3.829-5.52L8.892 24H13Zm7.777 0h2.042a11.01 11.01 0 0 0-7.041-8.334L13 24h2.108l1.84-5.52A9.012 9.012 0 0 1 20.777 24ZM13 16v2h-2v-2h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEmployer;
