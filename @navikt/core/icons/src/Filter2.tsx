import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFilter2 = forwardRef(
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
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <mask id="Filter2_svg__a" fill="#fff">
          <path d="M0 3.5v1.175a1 1 0 0 0 .316.73l8.032 7.53v10.103a1 1 0 0 0 1.247.97l5.826-1.49a1 1 0 0 0 .753-.969v-8.614l7.533-7.533A1 1 0 0 0 24 4.694V3.5a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1Z" />
        </mask>
        <path
          d="m23.707 5.402 1.414 1.414-1.414-1.414Zm-7.533 7.533L14.76 11.52l-.586.585v.829h2Zm-.752 9.583-.496-1.937.495 1.937Zm-5.827 1.49.496 1.937-.496-1.938ZM8.348 12.934h2v-.867l-.632-.592-1.368 1.459ZM.316 5.405l1.368-1.46-1.368 1.46ZM2 4.675V3.5h-4v1.175h4ZM1 4.5h22v-4H1v4Zm21-1v1.194h4V3.5h-4Zm.293.487-7.533 7.534 2.828 2.828 7.533-7.533-2.828-2.829Zm-8.12 8.948v8.614h4v-8.614h-4Zm.753 7.646L9.1 22.07l.99 3.875 5.827-1.489-.99-3.875Zm-4.578 2.457V12.935h-4v10.103h4Zm-.632-11.562-8.032-7.53-2.736 2.918 8.032 7.53 2.736-2.918ZM9.1 22.07a1 1 0 0 1 1.248.968h-4a3 3 0 0 0 3.743 2.907L9.1 22.07ZM22 4.694a1 1 0 0 1 .293-.707l2.828 2.829A3 3 0 0 0 26 4.694h-4Zm1-.194a1 1 0 0 1-1-1h4a3 3 0 0 0-3-3v4Zm-21-1a1 1 0 0 1-1 1v-4a3 3 0 0 0-3 3h4Zm12.174 18.05a1 1 0 0 1 .752-.97l.99 3.876a3 3 0 0 0 2.258-2.907h-4ZM-2 4.674a3 3 0 0 0 .948 2.19l2.736-2.92a1 1 0 0 1 .316.73h-4Z"
          fill="currentColor"
          mask="url(#Filter2_svg__a)"
        />
      </svg>
    );
  }
);
export default SvgFilter2;
