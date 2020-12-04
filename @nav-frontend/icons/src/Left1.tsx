import * as React from "react";

function Left1(
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
      <path d="M9.625 11H24v2H9.625v9L0 12 9.625 2v9z" fill="currentColor" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Left1);
export default ForwardRef;
