import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHeartBrokenFilled = forwardRef(
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
          d="M11.402 2.631A6.778 6.778 0 0 0 7 1C3.134 1 0 4.283 0 8.333c0 2.053.702 3.907 2 5.238l7.639 7.203L12.646 11H8.613l2.79-8.369Zm-.141 19.672L12 23l10-9.429c1.297-1.33 2-3.185 2-5.238C24 4.283 20.866 1 17 1c-1.16 0-2.256.296-3.22.82L11.388 9h3.967L11.26 22.303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHeartBrokenFilled;
