import * as React from "react";

function Male1(
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
        d="M13 17h-2v7H9v-7l-2-3V8a2 2 0 012-2h6a2 2 0 012 2v6l-2 3v7h-2v-7zM12 6a3 3 0 110-6 3 3 0 010 6zm-1-3a1 1 0 112 0 1 1 0 01-2 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Male1);
export default ForwardRef;
