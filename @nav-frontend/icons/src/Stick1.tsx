import * as React from "react";

function Stick1(
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
        d="M17 10h-2v14h-2V7a1 1 0 00-.918-.997L11.979 6a1 1 0 00-.976.918l-.003.11V9a3 3 0 11-6 0V7a7 7 0 0114 0v17h-2V10z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Stick1);
export default ForwardRef;
