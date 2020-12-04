import * as React from "react";

function Cancel1(
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
        d="M24 15a9 9 0 00-9-9h-3.375V0L5 7l6.625 7V8H15l.24.004A7 7 0 0115 22H0v2h15a9 9 0 009-9z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Cancel1);
export default ForwardRef;
