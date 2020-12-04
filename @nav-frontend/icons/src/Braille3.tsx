import * as React from "react";

function Braille3(
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
      <path fill="#fff" d="M0 0h24v24H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2a2 2 0 00-2 2v16a2 2 0 002 2h20a2 2 0 002-2V4a2 2 0 00-2-2H2zm2 6a2 2 0 100-4 2 2 0 000 4zm16-1a1 1 0 100-2 1 1 0 000 2zm-9-1a1 1 0 11-2 0 1 1 0 012 0zm-7 8a2 2 0 100-4 2 2 0 000 4zm17-2a1 1 0 11-2 0 1 1 0 012 0zm-11 2a2 2 0 100-4 2 2 0 000 4zm6-2a1 1 0 11-2 0 1 1 0 012 0zM4 19a1 1 0 100-2 1 1 0 000 2zm18-1a2 2 0 11-4 0 2 2 0 014 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Braille3);
export default ForwardRef;
