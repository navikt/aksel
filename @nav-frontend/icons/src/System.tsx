import * as React from "react";

function System(
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
        d="M4 0H0v4h4V0zm0 10H0v4h4v-4zM0 20h4v4H0v-4zM14 0h-4v4h4V0zm-4 10h4v4h-4v-4zm4 10h-4v4h4v-4zm6-20h4v4h-4V0zm4 10h-4v4h4v-4zm-4 10h4v4h-4v-4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(System);
export default ForwardRef;
