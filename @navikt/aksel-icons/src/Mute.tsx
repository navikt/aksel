import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMute = forwardRef(
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
          d="m6 6 12 12"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask
          id="mute_svg__a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 0H0v24h24V0ZM4.06 1.94a1.5 1.5 0 1 0-2.12 2.12l18 18a1.5 1.5 0 0 0 2.12-2.12l-18-18Z"
            fill="#000"
          />
        </mask>
        <g
          mask="url(#mute_svg__a)"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <path d="M15 11.5v-5a3 3 0 1 0-6 0v5a3 3 0 1 0 6 0Z" />
          <path
            d="M17 10.5v1a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v-1M11.905 20.5v-4M13.905 20.5h-4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }
);
export default SvgMute;
