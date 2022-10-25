import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDecisionFilled = forwardRef(
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
          d="M11 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 1a7 7 0 0 0-7 7h4.71l6.078-5.888A6.967 6.967 0 0 0 11 11Zm6.864 1.285c.39-.38 1.024-.38 1.414 0l4.42 4.307c.39.38.39.998 0 1.378l-2.475 2.412c-.39.38-1.024.38-1.415 0l-1.59-1.55L12.914 24 11.5 22.622l5.303-5.168-1.414-1.379a.957.957 0 0 1 0-1.378l2.475-2.412Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDecisionFilled;
