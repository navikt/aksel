import * as React from "react";

function Profile(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 8A6 6 0 116 8a6 6 0 0112 0zm-1.905 6.874a8 8 0 10-8.19 0A10.002 10.002 0 002 24h2a8 8 0 1116 0h2c0-4.064-2.424-7.562-5.905-9.126z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Profile);
export default ForwardRef;
