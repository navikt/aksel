import * as React from "react";

function Print1(
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
        d="M20 0v5a4 4 0 014 4v10h-4v5H4v-5H0V9a4 4 0 014-4V0h16zm-2 12H6v10h12V12zm-2 2v2H8v-2h8zm-2 4v2H8v-2h6zm4-16H6v3h12V2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Print1);
export default ForwardRef;
