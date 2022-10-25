import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDataFilled = forwardRef(
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
        <mask id="DataFilled_svg__a" fill="#fff">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v19H9V1ZM2 12a1 1 0 0 0-1 1v7h6v-7a1 1 0 0 0-1-1H2Zm22 10H0v2h24v-2ZM18 6a1 1 0 0 0-1 1v13h6V7a1 1 0 0 0-1-1h-4Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v19H9V1ZM2 12a1 1 0 0 0-1 1v7h6v-7a1 1 0 0 0-1-1H2Zm22 10H0v2h24v-2ZM18 6a1 1 0 0 0-1 1v13h6V7a1 1 0 0 0-1-1h-4Z"
          fill="currentColor"
        />
        <path
          d="M15 20v2h2v-2h-2Zm-6 0H7v2h2v-2Zm-8 0h-2v2h2v-2Zm6 0v2h2v-2H7Zm-7 2v-2h-2v2h2Zm24 0h2v-2h-2v2ZM0 24h-2v2h2v-2Zm24 0v2h2v-2h-2Zm-7-4h-2v2h2v-2Zm6 0v2h2v-2h-2ZM10-2a3 3 0 0 0-3 3h4a1 1 0 0 1-1 1v-4Zm4 0h-4v4h4v-4Zm3 3a3 3 0 0 0-3-3v4a1 1 0 0 1-1-1h4Zm0 19V1h-4v19h4Zm-8 2h6v-4H9v4ZM7 1v19h4V1H7ZM3 13a1 1 0 0 1-1 1v-4a3 3 0 0 0-3 3h4Zm0 7v-7h-4v7h4Zm4-2H1v4h6v-4Zm-2-5v7h4v-7H5Zm1 1a1 1 0 0 1-1-1h4a3 3 0 0 0-3-3v4Zm-4 0h4v-4H2v4ZM0 24h24v-4H0v4Zm2 0v-2h-4v2h4Zm22-2H0v4h24v-4Zm-2 0v2h4v-2h-4ZM19 7a1 1 0 0 1-1 1V4a3 3 0 0 0-3 3h4Zm0 13V7h-4v13h4Zm4-2h-6v4h6v-4ZM21 7v13h4V7h-4Zm1 1a1 1 0 0 1-1-1h4a3 3 0 0 0-3-3v4Zm-4 0h4V4h-4v4Z"
          fill="currentColor"
          mask="url(#DataFilled_svg__a)"
        />
      </svg>
    );
  }
);
export default SvgDataFilled;
