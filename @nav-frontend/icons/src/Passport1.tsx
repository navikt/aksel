import * as React from "react";

function Passport1(
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
        d="M2 0v24h17a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.5 14A4.826 4.826 0 0015 9.36V6H8v3.36A4.826 4.826 0 0011.5 14zm4.5 4v-2H7v2h9z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Passport1);
export default ForwardRef;
