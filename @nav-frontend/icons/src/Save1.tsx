import * as React from "react";

function Save1(
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
        d="M13 0v11.375h6L12 18l-7-6.625h6V0h2zM8 4.936V2.75l-.271.11A11.003 11.003 0 001 13c0 6.075 4.925 11 11 11s11-4.925 11-11c0-4.664-2.902-8.65-6.999-10.25v2.186a9 9 0 11-8.001 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Save1);
export default ForwardRef;
