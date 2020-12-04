import * as React from "react";

function Glass(
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
        d="M6.252 6l-.167-4h11.83l-.167 4H6.252zm.083 2l.543 13.042a1 1 0 001 .958h8.244a1 1 0 001-.958L17.665 8H6.335zM4.043 1.042a1 1 0 011-1.042h13.914a1 1 0 011 1.042l-.837 20.083A3 3 0 0116.122 24H7.878a3 3 0 01-2.998-2.875L4.043 1.042z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Glass);
export default ForwardRef;
