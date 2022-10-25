import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHeartBroken = forwardRef(
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
          d="M24 8.333C24 4.283 20.866 1 17 1c-1.959 0-3.73.843-5 2.202C10.73 1.843 8.96 1 7 1 3.134 1 0 4.283 0 8.333c0 2.053.702 3.907 2 5.238L12 23l10-9.429c1.297-1.33 2-3.185 2-5.238ZM13.641 4.385C14.555 3.498 15.741 3 17 3c2.74 0 5 2.368 5 5.333l-.006.276a5.469 5.469 0 0 1-1.529 3.568l-1.103 1.131-6.987 6.588L15.344 10h-4.042l1.164-4.367.996-1.066.18-.182Zm-2.992.3-.11-.117C9.604 3.566 8.345 3 7 3 4.26 3 2 5.368 2 8.333c0 1.383.494 2.674 1.357 3.653l.178.191 1.102 1.131 5.945 5.605L12.656 12H8.698l1.951-7.315Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHeartBroken;
