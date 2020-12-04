import * as React from "react";

function Woman1(
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
        d="M12.024 0c3.604 0 6.727 2.5 7.515 6.017L22 17h-2.858A9.967 9.967 0 0122 24H2a9.968 9.968 0 012.858-7H2L4.493 6.014A7.723 7.723 0 0112.023 0zM7 8.546l5.002-3.18L17 8.511V9l-.005.217A5 5 0 017 9v-.454z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Woman1);
export default ForwardRef;
