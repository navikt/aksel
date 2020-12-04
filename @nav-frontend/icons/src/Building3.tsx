import * as React from "react";

function Building3(
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
        d="M24 24V0H6v9H0v15h24zM14 14v-3h-2v3h2zm4 0v-3h-2v3h2zm-4-6V5h-2v3h2zm4 0V5h-2v3h2zM6 22V11H2v11h4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Building3);
export default ForwardRef;
