import * as React from "react";

function Save21(
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
        d="M20 8.375L14 14 8 8.375h5V0h2v8.375h5zM3.649 22.704A2 2 0 005.521 24H23c.496 0 1-.5 1-1.008V9.722c0-1.043-.895-1.889-2-1.889h-1v2h1V18.9l-.887-2.265a1 1 0 00-.931-.635H12l-2.707-2.707A1 1 0 008.586 13L6 12.999V10h1V8H6c-1.105 0-2 .846-2 1.889v3.11L1 13c-.842 0-.975.71-.996 1.143L0 14.352l3.649 8.352z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Save21);
export default ForwardRef;
