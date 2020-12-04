import * as React from "react";

function Right1(
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
        d="M14.375 13H0v-2h14.375V2L24 12l-9.626 10v-9z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Right1);
export default ForwardRef;
