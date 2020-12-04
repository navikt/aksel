import * as React from "react";

function Healthcase1(
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
        d="M15 1a2 2 0 012 2v2h5a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V7a2 2 0 012-2h5V3a2 2 0 012-2h6zm-2 9v3h3v2h-3v3h-2v-3H8v-2h3v-3h2zm2-7H9v2h6V3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Healthcase1);
export default ForwardRef;
