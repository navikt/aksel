import * as React from "react";

function Traning(
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
        d="M5 6a1 1 0 012 0v5h10V6a1 1 0 112 0v12a1 1 0 11-2 0v-5H7v5a1 1 0 11-2 0V6zm-5 5h2V8a1 1 0 012 0v8a1 1 0 11-2 0v-3H0v-2zm22 0h2v2h-2v3a1 1 0 11-2 0V8a1 1 0 112 0v3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Traning);
export default ForwardRef;
