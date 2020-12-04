import * as React from "react";

function List1(
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
        d="M0 6V0h6v6H0zm0 9V9h6v6H0zm0 3v6h6v-6H0zM24 2H8v2h16V2zM8 11h16v2H8v-2zm16 9H8v2h16v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(List1);
export default ForwardRef;
