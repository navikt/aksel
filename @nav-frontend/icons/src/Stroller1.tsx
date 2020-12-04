import * as React from "react";

function Stroller1(
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
        d="M9.5 17a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm9 0a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-9 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM16 0a8.001 8.001 0 017.938 6.999L24 7v3a6 6 0 01-6 6h-8a6 6 0 01-6-6V8.143C4 5.918 2.31 4.113.2 4.005L0 4V2c2.938 0 5.374 2.158 5.896 5L13.63 7V0H16z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Stroller1);
export default ForwardRef;
