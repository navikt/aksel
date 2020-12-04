import * as React from "react";

function Externallink1(
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
        d="M24 0v9l-4-3.5-9.657 9.571-1.414-1.414L18.5 4 15 0h9zM12 6V4H0v20h20V12h-2v10H2V6h10z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Externallink1);
export default ForwardRef;
