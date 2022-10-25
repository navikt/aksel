import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShower = forwardRef(
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
          d="M0 2h9a3 3 0 0 1 3 3v1.062A8.008 8.008 0 0 0 5.252 12 8.014 8.014 0 0 0 5 14h16c0-.69-.087-1.36-.252-2A8.008 8.008 0 0 0 14 6.062V5a5 5 0 0 0-5-5H0v2Zm9 15a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1Zm9-1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-4 1a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1Zm-1 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-4 1a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1Zm9-1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm.659-9H7.34a6.003 6.003 0 0 1 11.318 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgShower;
