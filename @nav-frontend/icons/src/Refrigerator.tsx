import * as React from "react";

function Refrigerator(
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
        d="M18 2H6v7h2v4H6v9h12V2zM6 0a2 2 0 00-2 2v20a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H6zm8 3.25l1.787 3.87c.664 1.438-.302 3.13-1.787 3.13-1.485 0-2.45-1.692-1.787-3.13L14 3.25z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Refrigerator);
export default ForwardRef;
