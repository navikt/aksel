import * as React from "react";

function Shape(
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
        d="M24 22a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h4V1A1 1 0 017.993.883L8 1v2h7.999L16 1a1 1 0 011.993-.117L18 1l-.001 2H22a2 2 0 012 2v17zM6 5H2v5h20V5h-4.001L18 7a1 1 0 01-1.993.117L16 7l-.001-2H8v2a1 1 0 01-1.993.117L6 7V5z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Shape);
export default ForwardRef;
