import * as React from "react";

function Send1(
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
        d="M24 12L0 1l2.727 10H14v2H2.727L0 23l24-11z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Send1);
export default ForwardRef;
