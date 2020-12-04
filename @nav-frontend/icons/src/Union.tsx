import * as React from "react";

function Union(
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
        d="M6 0H0v6h6V0zm0 9H0v6h6V9zm-6 9h6v6H0v-6zM15 0H9v6h6V0zM9 9h6v6H9V9zm6 9H9v6h6v-6zm3-18h6v6h-6V0zm6 9h-6v6h6V9zm-6 9h6v6h-6v-6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Union);
export default ForwardRef;
