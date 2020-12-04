import * as React from "react";

function Files1(
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
        d="M18 24H2V4h4V0h10l6 6v14h-4v4zM6 20V6H3.999L4 22h12v-2H6zm9-18.17V6l4.17-.001L15 1.83z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Files1);
export default ForwardRef;
