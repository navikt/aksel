import * as React from "react";

function Parking(
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
        d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM4 0a4 4 0 00-4 4v16a4 4 0 004 4h16a4 4 0 004-4V4a4 4 0 00-4-4H4zm5 7v5h3.5a2.5 2.5 0 000-5H9zm0 7h3.5a4.5 4.5 0 100-9H7v14h2v-5z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Parking);
export default ForwardRef;
