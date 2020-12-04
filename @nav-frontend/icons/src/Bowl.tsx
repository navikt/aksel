import * as React from "react";

function Bowl(
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
        d="M2 8V7h20v1a8 8 0 01-8 8h-4a8 8 0 01-8-8zm4 9.168A10.002 10.002 0 010 8V6a1 1 0 011-1h22a1 1 0 011 1v2c0 4.1-2.468 7.625-6 9.168V18a1 1 0 01-1 1H7a1 1 0 01-1-1v-.832z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bowl);
export default ForwardRef;
