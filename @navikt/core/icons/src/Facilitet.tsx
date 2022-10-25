import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFacilitet = forwardRef(
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
          d="M17 7.268a2 2 0 0 1-1-1.733V2h-2.37a4.648 4.648 0 0 1-9.26 0H2v14h3.535a2 2 0 0 1 1.731 3.002 2 2 0 1 0 3.467 0A2 2 0 0 1 12.466 16H16v-3.535a2 2 0 0 1 3.002-1.731 2 2 0 1 0 0-3.467 2 2 0 0 1-2.001 0Zm-3.352-5.649v.001-.001ZM18 1.059C18 .474 17.526 0 16.941 0h-4.12c-.701 0-1.174.887-1.174 1.588a2.647 2.647 0 0 1-5.294 0C6.353.887 5.88 0 5.179 0h-4.12C.474 0 0 .474 0 1.059V16.94C0 17.526.474 18 1.059 18h4.476a4 4 0 1 0 6.93 0h4.476c.585 0 1.059-.474 1.059-1.059v-4.476a4 4 0 1 0 0-6.93V1.06Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFacilitet;
