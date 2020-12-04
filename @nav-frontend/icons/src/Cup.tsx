import * as React from "react";

function Cup(
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
        d="M2 16V5h14v11a4 4 0 01-4 4H6a4 4 0 01-4-4zM0 4a1 1 0 011-1h16a1 1 0 011 1v3.256a4.5 4.5 0 110 8.488V16a6 6 0 01-6 6H6a6 6 0 01-6-6V4zm18 9.5a2.5 2.5 0 100-4v4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Cup);
export default ForwardRef;
