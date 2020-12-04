import * as React from "react";

function Building1(
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
        d="M24 0v24H0V9h6V0h18zm-2 2H8v20H6V11H2v11h20V2zm-8 9v3h-2v-3h2zm4 0v3h-2v-3h2zm-4-6v3h-2V5h2zm4 0v3h-2V5h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Building1);
export default ForwardRef;
