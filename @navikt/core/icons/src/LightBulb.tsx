import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLightBulb = forwardRef(
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
          d="M14 22a2 2 0 0 1-3.995.15L10 22h4Zm1-3v2H9v-2h6ZM12 0c4.418 0 8 3.626 8 8.1a8.133 8.133 0 0 1-1.413 4.598l-.392.552c-.652.952-1.532 2.535-2.64 4.75h-7.11l-.534-1.053c-.853-1.66-1.55-2.887-2.094-3.68L5.6 12.96A8.13 8.13 0 0 1 4 8.1C4 3.626 7.582 0 12 0Zm0 2C8.692 2 6 4.726 6 8.1c0 1.25.369 2.438 1.045 3.441l.412.58.268.404c.505.786 1.094 1.83 1.777 3.144l.171.331h4.654l.173-.334c.813-1.561 1.492-2.741 2.054-3.56l.243-.34A6.13 6.13 0 0 0 18 8.1C18 4.726 15.308 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLightBulb;
