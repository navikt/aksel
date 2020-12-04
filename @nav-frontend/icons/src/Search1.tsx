import * as React from "react";

function Search1(
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
        d="M9 0a9 9 0 017.039 14.61L24 22.57 22.571 24l-7.962-7.961A9 9 0 119 0zm0 2a6.97 6.97 0 00-4.234 1.425l1.99 1.106a5 5 0 017.224 4.013l1.99 1.106A7 7 0 009 2zm-4.9 8A5.002 5.002 0 009 14v2a7.002 7.002 0 01-6.93-6H4.1z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Search1);
export default ForwardRef;
