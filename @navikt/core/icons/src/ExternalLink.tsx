import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgExternalLink = forwardRef(
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
          d="M20.586 2H14V0h10v10h-2V3.414L10.707 14.707l-1.414-1.414L20.586 2ZM0 5a2 2 0 0 1 2-2h8.5v2H2v17h17v-8.5h2V22a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgExternalLink;
