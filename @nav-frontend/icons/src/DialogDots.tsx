import * as React from "react";

function Dialogdots(
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
        d="M4 0a4 4 0 00-4 4v20l7-5h13a4 4 0 004-4V4a4 4 0 00-4-4H4zm16 2a2 2 0 011.994 1.85L22 15c0 1.054-.965 1.924-2 2H6l-4 3V4a2 2 0 011.85-1.995L20 2zM7 9a1 1 0 100 2 1 1 0 000-2zm5 0a1 1 0 100 2 1 1 0 000-2zm5 0a1 1 0 100 2 1 1 0 000-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Dialogdots);
export default ForwardRef;
