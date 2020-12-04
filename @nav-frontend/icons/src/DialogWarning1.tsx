import * as React from "react";

function Dialogwarning1(
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
        d="M4 0a4 4 0 00-4 4v20l7-5h13a4 4 0 004-4V4a4 4 0 00-4-4H4zm8 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-1-8h2v6h-2V4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Dialogwarning1);
export default ForwardRef;
