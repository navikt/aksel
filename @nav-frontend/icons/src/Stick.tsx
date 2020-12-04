import * as React from "react";

function Stick(
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
        d="M17 10h-2v14h-2V7a1 1 0 00-.918-.997L11.979 6a1 1 0 00-.976.918l-.003.11V9a3 3 0 11-6 0V7a7 7 0 0114 0v17h-2V10zm0-2V7a4.987 4.987 0 00-1.344-3.411 4.986 4.986 0 00-3.387-1.582h-.008A5.084 5.084 0 0012.034 2h-.04a4.982 4.982 0 00-3.404 1.344 4.986 4.986 0 00-1.582 3.387v.008A5.083 5.083 0 007 6.968V9a1 1 0 002 0V7l.005-.176A3 3 0 0112 4l.176.005A3 3 0 0115 7v1h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Stick);
export default ForwardRef;
