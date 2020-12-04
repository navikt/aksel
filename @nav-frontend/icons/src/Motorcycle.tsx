import * as React from "react";

function Motorcycle(
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
        d="M3 3a1 1 0 011-1h2a1 1 0 01.707.293l1.345 1.092c.194-.11.402-.203.62-.276l.798-.266a8 8 0 015.06 0l.797.266c.203.068.396.152.578.252l1.334-1.068c.19-.188.448-.293.717-.293H20a1 1 0 110 2h-1.623l-1.056.815c.308.595.446 1.281.368 1.985l-.022.2H19a1 1 0 110 2h-1.643A5.573 5.573 0 0116 11.313V17a4.002 4.002 0 01-3 3.874V23a1 1 0 11-2 0v-2.126A4.002 4.002 0 018 17v-5.687A5.572 5.572 0 016.643 9H5a1 1 0 010-2h1.333l-.022-.2a3.476 3.476 0 01.353-1.955L5.586 4H4a1 1 0 01-1-1zm12.701 3.58l-.137 1.23a3.574 3.574 0 01-.676 1.73 1 1 0 10-1.556 1.204 3.578 3.578 0 01-2.664 0A1 1 0 109.112 9.54a3.574 3.574 0 01-.676-1.73l-.137-1.23a1.485 1.485 0 011.006-1.574l.798-.265a6 6 0 013.794 0l.798.265A1.485 1.485 0 0115.7 6.58zM10 12.63V17a2 2 0 001 1.732V17a1 1 0 112 0v1.732A2 2 0 0014 17v-4.37a5.574 5.574 0 01-2 .37c-.703 0-1.377-.13-2-.37z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Motorcycle);
export default ForwardRef;
