import * as React from "react";

function Login1(
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
        d="M23 2a2 2 0 00-2-2H11a2 2 0 00-2 2v3h2V2h10v20H11v-3H9v3a2 2 0 002 2h10a2 2 0 002-2V2zM12.375 6L18 12l-5.625 6v-5H1v-2h11.375V6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Login1);
export default ForwardRef;
