import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgQuiet = forwardRef(
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
          d="M22 2h-4.42l-2.857 5H18v4h2a1 1 0 1 1 0 2h-2v2a2 2 0 0 0 2 2h2V2ZM2 2h13.277l-2.29 4.008C12.225 7.34 13.187 9 14.723 9H16v6a4 4 0 0 0 4 4h2v3h-8v-9.5a2.5 2.5 0 0 0-5 0v3.864l-3.052.832A4 4 0 0 0 3 21.056V22H2V2Zm3 20h7v-9.5a.5.5 0 0 0-1 0v5.391l-4.526 1.235A2 2 0 0 0 5 21.056V22Zm-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgQuiet;
