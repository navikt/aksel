import * as React from "react";

function Search(
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
        d="M9 0a9 9 0 017.039 14.61L24 22.57 22.571 24l-7.962-7.961A9 9 0 119 0zm0 2a7 7 0 100 14A7 7 0 009 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Search);
export default ForwardRef;
