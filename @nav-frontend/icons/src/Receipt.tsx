import * as React from "react";

function Receipt(
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
        d="M19 0v24H5V0l3 2 2-2 2 2 2-2 2 2 3-2zm-5 2.829l-2 2-2-2-1.745 1.745L7 3.737V22h10V3.737l-1.255.837L14 2.829zM12 18v2H9v-2h3zm3-4v2H9v-2h6zm-2-4v2H9v-2h4zm2-4v2H9V6h6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Receipt);
export default ForwardRef;
