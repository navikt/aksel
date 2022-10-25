import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGlassesFilled = forwardRef(
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
          d="M4 3a2 2 0 0 0-2 2v10h20V5a2 2 0 1 0-4 0v1a1 1 0 1 1-2 0V5a4 4 0 0 1 8 0v14a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4v-2h-2v2a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V5a4 4 0 1 1 8 0v1a1 1 0 0 1-2 0V5a2 2 0 0 0-2-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGlassesFilled;
