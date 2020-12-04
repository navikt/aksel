import * as React from "react";

function List(
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
        d="M2 2h2v2H2V2zM0 6V0h6v6H0zm2 5h2v2H2v-2zm-2 4V9h6v6H0zm4 5H2v2h2v-2zm-4-2v6h6v-6H0zM24 2H8v2h16V2zM8 11h16v2H8v-2zm16 9H8v2h16v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(List);
export default ForwardRef;
