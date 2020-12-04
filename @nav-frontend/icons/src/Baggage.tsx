import * as React from "react";

function Baggage(
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
        d="M9 2h6v3H9V2zM7 5V2a2 2 0 012-2h6a2 2 0 012 2v3h1a2 2 0 012 2v13a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H6a2 2 0 01-2-2V7a2 2 0 012-2h1zm8 2H6v13h12V7h-3zm-7 3h8v2H8v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Baggage);
export default ForwardRef;
