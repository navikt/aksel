import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLike = forwardRef(
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
          d="M3.972 8H0v15h5.958v-1.352l2.694 1.072c.465.185.96.28 1.46.28h8.7c1.37 0 2.563-.941 2.892-2.28l2.208-9C24.376 9.828 22.954 8 21.02 8h-6.818l1.09-4.529C15.597 2.212 14.65 1 13.363 1h-2.097a1.98 1.98 0 0 0-1.534.73L4.611 8h-.64Zm1.986 1.5v9.997l3.424 1.363c.232.093.48.14.73.14h8.7a.994.994 0 0 0 .964-.76l2.208-9A.998.998 0 0 0 21.02 10h-9.342l1.684-7h-2.097L5.958 9.5ZM3.972 20.857V10H1.986v11h1.986v-.143Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLike;
