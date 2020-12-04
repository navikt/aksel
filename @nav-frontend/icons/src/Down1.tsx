import * as React from "react";

function Down1(
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
      <path d="M11 14.374V0h2v14.375h9L12 24 2 14.374h9z" fill="currentColor" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Down1);
export default ForwardRef;
