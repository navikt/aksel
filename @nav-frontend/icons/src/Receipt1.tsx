import * as React from "react";

function Receipt1(
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
        d="M19 0v24H5V0l3 2 2-2 2 2 2-2 2 2 3-2zm-7 18v2H9v-2h3zm3-4v2H9v-2h6zm-2-4v2H9v-2h4zm2-4v2H9V6h6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Receipt1);
export default ForwardRef;
