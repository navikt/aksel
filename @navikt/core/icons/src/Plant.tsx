import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPlant = forwardRef(
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
          d="M12 4.667c0 .83-.477 2.306-1.248 3.695A9.887 9.887 0 0 1 10 9.531a9.884 9.884 0 0 1-.752-1.169C8.477 6.973 8 5.497 8 4.667 8 2.83 9.15 2 10 2c.564 0 1.018.21 1.347.572.335.37.653 1.03.653 2.095Zm-2.55 5.46c-.01.006-.008.004.004-.003l-.004.003Zm1.096-.003c.012.007.013.01.004.003l-.004-.003ZM6 4.667c0 2.088 1.635 5.402 2.984 6.742A8.563 8.563 0 0 0 6 17.905v2.006c-2.076.44-3.982 1.802-5 4.089h2.235c2.026-2.994 6.504-2.994 8.53 0H14c-1.18-2.65-3.552-4.06-6-4.228v-1.866c0-2 .908-3.856 2.411-5.084C11.608 14.204 15.145 16 17.333 16 20 16 22 14.21 22 12s-1.721-4-4.667-4c-1.452 0-3.498.791-5.06 1.727C13.209 8.165 14 6.12 14 4.667 14 1.72 12.21 0 10 0S6 2 6 4.667ZM17.333 10c-.83 0-2.306.477-3.695 1.248-.463.257-.86.516-1.169.752.31.236.706.495 1.169.752 1.389.771 2.865 1.248 3.695 1.248C19.17 14 20 12.85 20 12c0-.564-.21-1.018-.572-1.347-.37-.335-1.03-.653-2.095-.653Zm-5.46 2.55c-.006.01-.004.008.003-.004l-.003.004Zm.003-1.096c-.007-.012-.01-.013-.003-.004l.003.004Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPlant;
