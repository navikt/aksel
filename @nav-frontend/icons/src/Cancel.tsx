import * as React from "react";

function Cancel(
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
        d="M15 6a9 9 0 110 18H0v-2h15a7 7 0 00.24-13.996L15 8H8.705L13 12.546 11.625 14 5 7l6.625-7L13 1.455 8.705 6H15z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Cancel);
export default ForwardRef;
