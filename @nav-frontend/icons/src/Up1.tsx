import * as React from "react";

function Up1(
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
      <path d="M13 9.625V24h-2V9.625H2L12 0l10 9.625h-9z" fill="currentColor" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Up1);
export default ForwardRef;
