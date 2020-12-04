import * as React from "react";

function Bike(
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
        d="M8.043 2.709A1 1 0 019 2h3a1 1 0 110 2H9.74L8.033 9.616a5.5 5.5 0 11-1.914-.582L8.043 2.71zM4.834 13.252L5.52 11H5.5a3.5 3.5 0 101.933.582l-.685 2.252a1 1 0 01-1.914-.582zM22 14.5a3.5 3.5 0 11-5.326-2.987l.952 2.754a1 1 0 001.89-.654l-.903-2.611A3.5 3.5 0 0122 14.5zm-4.069-5.47a5.5 5.5 0 11-1.92.565L15.458 8H11a1 1 0 110-2h5a1 1 0 01.852.476.995.995 0 01.365.488l.714 2.065z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bike);
export default ForwardRef;
