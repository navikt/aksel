import * as React from "react";

function Filter1(
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
        d="M23 4V0H1v5l8 8v11l6-3v-8l7-7h-9V4h10z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Filter1);
export default ForwardRef;
