import * as React from "react";

function Girl1(
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
        d="M12 0a8 8 0 017.738 10.036 1 1 0 01.612 1.9l2.771 2.771-1.414 1.414-3.312-3.313a8.042 8.042 0 01-2.3 2.066A10.002 10.002 0 0122 24H2c0-4.064 2.424-7.562 5.905-9.126a8.032 8.032 0 01-2.08-1.787l-3.032 3.034-1.414-1.414 2.712-2.712L4 12a1 1 0 01-.993-.883L3 11a1 1 0 011.263-.965A8 8 0 0112 0zm0 14a6 6 0 006-6H6a6 6 0 006 6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Girl1);
export default ForwardRef;
