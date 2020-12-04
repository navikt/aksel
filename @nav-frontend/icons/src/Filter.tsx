import * as React from "react";

function Filter(
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
        d="M23 0v5l-8 8v8l-6 3V13L1 5V0h22zm-2 2H3v2.171l8 8v8.593l2-1v-7.592L19.17 6H13V4h8V2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Filter);
export default ForwardRef;
