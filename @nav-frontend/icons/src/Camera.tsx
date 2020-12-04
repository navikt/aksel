import * as React from "react";

function Camera(
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
        d="M15.34 2a1 1 0 01.92.606L18.143 7H23a1 1 0 011 1v13a1 1 0 01-1 1H1a1 1 0 01-1-1V8a1 1 0 011-1h4.857L7.74 2.606A1 1 0 018.66 2h6.68zm-.659 2H9.318L7.176 9H2v11h20V9h-5.176l-2.143-5zM12 9a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Camera);
export default ForwardRef;
