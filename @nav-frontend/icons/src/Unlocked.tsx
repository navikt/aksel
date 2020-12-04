import * as React from "react";

function Unlocked(
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
        d="M5 0a5 5 0 015 5v3h9a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h1V5a3 3 0 00-2.824-2.995L5 2a3 3 0 00-2.995 2.824L2 5v2H0V5a5 5 0 015-5zm14 10H7v12h12V10zm-6 3a2 2 0 011.001 3.732L14 20h-2v-3.268A2 2 0 0113 13z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Unlocked);
export default ForwardRef;
