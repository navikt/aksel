import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgUpload = forwardRef(
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
          d="M3 18v2a2 2 0 0 0 1.85 1.994L5 22h14a2 2 0 0 0 1.994-1.85L21 20v-2h2v2a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-2h2Zm9-18 7 6.625L17.546 8 13 3.705V17h-2V3.705L6.455 8 5 6.625 12 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgUpload;
