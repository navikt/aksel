import * as React from "react";

function Picture1(
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
        d="M24 24H0V0h24v24zM16 8l-6 12-3.5-7L2 22h21L16 8zM8.5 4a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Picture1);
export default ForwardRef;
