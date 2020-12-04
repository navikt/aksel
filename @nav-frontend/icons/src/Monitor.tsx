import * as React from "react";

function Monitor(
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
        d="M22 3H2v13h20V3zM2 1a2 2 0 00-2 2v13a2 2 0 002 2h9v3H7a2 2 0 00-2 2h14a2 2 0 00-2-2h-4v-3h9a2 2 0 002-2V3a2 2 0 00-2-2H2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Monitor);
export default ForwardRef;
