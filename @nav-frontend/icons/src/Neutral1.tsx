import * as React from "react";

function Neutral1(
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
        d="M11 4a1 1 0 100-2 1 1 0 000 2zm0 2a3 3 0 100-6 3 3 0 000 6zm-1-.129H8c-1.105 0-2 .902-2 2.014v6.043l2 3.022V24h2V5.87zM12 24l.016-7V5.983c1.597.32 3.267 1.307 3.267 2.906v3.023l2.628 5.647c.238.511-.02 1.104-.574 1.323a1.176 1.176 0 01-.431.081h-2.718V24H12z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Neutral1);
export default ForwardRef;
