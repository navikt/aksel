import * as React from "react";

function Mobile(
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
        d="M18 0a2 2 0 012 2v20a2 2 0 01-2 2H6a2 2 0 01-2-2V2a2 2 0 012-2h12zm0 18H6v4h12v-4zm-6 1a1 1 0 110 2 1 1 0 010-2zm6-13H6v10h12V6zm0-4H6v2h12V2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Mobile);
export default ForwardRef;
