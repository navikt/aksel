import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLaw = forwardRef(
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
          d="m12.433 6.598-5.198-3 .5-.866 5.198 3-.5.866Zm-6.93-4a1.998 1.998 0 0 0-.001 2L3.234 8.526a2 2 0 0 0-1.733 1L0 12.124l8.664 5 1.5-2.598a1.998 1.998 0 0 0 0-2l.652-1.129L23 18.428l1-1.732-12.183-7.03.616-1.068a2 2 0 0 0 1.733-1L15.666 5 7.003 0l-1.5 2.598ZM5.1 9.294l2-3.464 3.466 2-2 3.464-3.466-2Zm-2.367 2.098.5-.866 5.199 3-.5.866-5.199-3ZM10 21H2v1h8v-1Zm-8-2a2 2 0 0 0-2 2v3h12v-3a2 2 0 0 0-2-2H2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLaw;
