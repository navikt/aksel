import * as React from "react";

function Login(
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
        d="M21 0a2 2 0 012 2v20a2 2 0 01-2 2H11a2 2 0 01-2-2v-3h2v3h10V2H11v3H9V2a2 2 0 012-2h10zm-8.625 6L18 12l-5.625 6L11 16.546 14.295 13H1v-2h13.295L11 7.455 12.375 6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Login);
export default ForwardRef;
