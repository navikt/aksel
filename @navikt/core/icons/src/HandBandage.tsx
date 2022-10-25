import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHandBandage = forwardRef(
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
          d="M10.496 3a.5.5 0 0 1 .5.5V9h-1V3.5a.5.5 0 0 1 .5-.5ZM7.995 9V3.5a2.5 2.5 0 0 1 3.389-2.338A2.5 2.5 0 0 1 13.497 0a2.5 2.5 0 0 1 2.113 1.162 2.501 2.501 0 0 1 3.35 1.896A2.5 2.5 0 0 1 22 5.5v10.111a4 4 0 0 1-2 3.465V24H8.994v-4l-4.157-4.156v-.002l-2.156-2.157a2.328 2.328 0 0 1 0-3.292 3.656 3.656 0 0 1 5.17 0l.143.142V9Zm11.31 8.126-8.762 1.593-2.928-2.927.639-.688 1.416-1.416 3.884.74 6.436 1.378a2 2 0 0 1-.685 1.32Zm-8.31 3.707V22h7.003v-2.333l-7.002 1.166ZM20 11v2.619l-6.048-1.152-3.955-.847V11H19.999Zm-13.561.807 1.113 1.114-.739.796-.635.635-2.08-2.081a.328.328 0 0 1 0-.464 1.656 1.656 0 0 1 2.34 0ZM19.999 9V5.5a.5.5 0 0 0-1 0V9h1Zm-3 0V3.5a.5.5 0 0 0-1.001 0V9h1Zm-3.002 0V2.5a.5.5 0 0 0-1 0V9h1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHandBandage;
