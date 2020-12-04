import * as React from "react";

function Close1(
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
        d="M24 0H0v24h24V0zM13.385 12L21 4.385 19.615 3 12 10.615 4.385 3 3 4.385 10.615 12 3 19.615 4.385 21 12 13.385 19.615 21 21 19.615 13.385 12z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Close1);
export default ForwardRef;
